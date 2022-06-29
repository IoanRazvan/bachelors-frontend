import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { LanguageService } from '../base/language.base';
import { UserListService } from '../core/services/user-list.service';
import { UserListResponse } from '../models/user-list.model';
import { ListPagedService } from './services/list-paged.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  providers: [ConfirmationService]
})
export class ListComponent implements OnInit {
  loading: boolean;
  lists!: UserListResponse[];
  selectedList?: UserListResponse;
  id!: number;
  userListFormOpened: boolean;
  userListFormAction?: 'UPDATE' | 'CREATE';
  userListTitle: string;
  submitting: boolean;
  dictionary: any;

  constructor(private userListService: UserListService, private router: Router, private route: ActivatedRoute, private confirmationService: ConfirmationService, private listService: ListPagedService, private cdRef: ChangeDetectorRef, private languageService: LanguageService) {
    this.loading = true;
    this.userListFormOpened = false;
    this.userListTitle = '';
    this.submitting = false;
    this.dictionary = languageService.dictionary;
  }

  ngOnInit(): void {
    this.userListService.getAll().subscribe(resp => {
      this.lists = resp;
      this.loading = false;
      this.listService.setLists(this.lists);
    });

    this.listService.listId$.subscribe((id) => {
      if (!this.selectedList) {
        this.selectedList = this.lists.find(list => list.id === id)
        this.cdRef.detectChanges();
      }
    });

    this.listService.listAction$.subscribe(listAction => {
      if (listAction.action === 'DELETE')
        this.onDeleteListClick();
      else
        this.onEditListClick();
    })
  }

  onDeleteListClick() {
    this.confirmationService.confirm({
      header: 'Confirmare',
      message: 'Doresti sa stergi lista?',
      accept: () => this.deleteUserList(),
      acceptLabel: this.dictionary.yes,
      rejectLabel: this.dictionary.no
    });
  }

  submitUserListForm(title: string) {
    if (this.userListFormAction === 'CREATE')
      this.addUserList(title);
    else
      this.updateUserList(title);
  }

  onEditListClick() {
    this.userListFormOpened = true;
    this.userListTitle = <any>this.selectedList?.listTitle;
    this.userListFormAction = 'UPDATE';
  }

  onAddListClick() {
    this.userListFormOpened = true;
    this.userListTitle = '';
    this.userListFormAction = 'CREATE';
  }

  onOptionClick() {
    this.router.navigate(['.', this.selectedList?.id], {relativeTo: this.route})
  }

  addUserList(title: string) {
    this.submitting = true;
    this.userListService.addList(title).subscribe(resp => {
      this.submitting = false;
      this.lists = this.lists.concat([resp]);
      this.listService.setLists(this.lists);
      this.closeUserListForm();
    });
  }

  updateUserList(title: string) {
    this.submitting = true;
    this.userListService.updateList(<any>this.selectedList?.id, title).subscribe(resp => {
      this.submitting = false;
      this.lists = this.lists.map(list => {
        if (list.id === this.selectedList?.id)
          return resp;
        return list
      });
      this.selectedList = resp
      this.listService.setLists(this.lists);
      this.closeUserListForm();
    })
  }

  deleteUserList() {
    this.userListService.deleteList(<any>this.selectedList?.id).subscribe(() => {
      const listIndex = this.lists.findIndex(list => list.id === this.selectedList?.id);
      let nextListIndex;
      if (listIndex === this.lists.length - 1)
        nextListIndex = 0;
      else
        nextListIndex = listIndex;
      this.lists = this.lists.filter(list => list.id !== this.selectedList?.id);
      this.selectedList = this.lists[nextListIndex];
      this.router.navigate(['.', this.selectedList.id], {relativeTo: this.route}).then(() => {
        this.listService.setLists(this.lists);
      });
    })
  }

  closeUserListForm() {
    this.userListFormOpened = false;
  }
}
