import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PartialObserver } from 'rxjs';
import { UserListProblemService } from 'src/app/core/services/user-list-problem.service';
import { UserListService } from 'src/app/core/services/user-list.service';
import { UserListResponse, UserListRow } from 'src/app/models/user-list.model';
import { ToastMessageService } from 'src/app/shared/services/toast-message.service';

@Component({
  selector: 'app-list-add-dropdown',
  templateUrl: './list-add-dropdown.component.html',
  styleUrls: ['list-add-dropdown.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ListAddDropdownComponent implements OnInit {
  lists!: UserListRow[];
  problemId!: number;
  selectedLists!: UserListRow[];
  lastUpdate!: UserListRow[];

  constructor(private userListService: UserListService, private route: ActivatedRoute, private userListProblemService: UserListProblemService, private messageService: ToastMessageService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(({ id }) => {
      this.userListService.getLists(id).subscribe((resp) => {
        this.lists = resp;
        this.selectedLists = this.lists.filter(userList => userList.containsProblem);
        this.lastUpdate = this.lists;
      });
      this.problemId = id;
    })
  }

  addList(list: UserListResponse) {
    this.lists = this.lists.concat(Object.assign({}, { containsProblem: false }, list));
  }

  onListClicked(event: any) {
    if (event.value.indexOf(event.option) !== -1)
      this.userListProblemService.saveUserListProblem(this.problemId, event.option.id).subscribe(this.getObserver(event.option.id, true));
    else
      this.userListProblemService.removeUserListProblem(this.problemId, event.option.id).subscribe(this.getObserver(event.option.id, false));
  }

  private getObserver(listId: number, containsProblem: boolean): PartialObserver<any> {
    return {
      next: () => {
        this.lists = this.lists.map(userList => {
          if (userList.id === listId)
            return { id: userList.id, listTitle: userList.listTitle, containsProblem };
          return userList;
        });
        this.selectedLists = this.lists.filter(userList => userList.containsProblem);
      },
      error: () => {
        this.selectedLists = this.lists.filter(userList => userList.containsProblem);
        this.messageService.addError('Problema nu a putut fi adaugata la lista');
      }
    };
  }
}
