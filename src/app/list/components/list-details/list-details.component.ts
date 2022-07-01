import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { LanguageService } from 'src/app/base/language.base';
import { extractPageInfo, PageInfo } from 'src/app/models/page-info.model';
import { ListProblem } from 'src/app/models/problem.model';
import { UserListResponse } from 'src/app/models/user-list.model';
import { ListPagedService } from '../../services/list-paged.service';

@Component({
  selector: 'app-list-details',
  templateUrl: './list-details.component.html',
  styleUrls: ['list-details.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ListDetailsComponent implements OnInit {
  loading: boolean;
  problems!: ListProblem[];
  pageInfo!: PageInfo;
  userList: UserListResponse;
  subscription?: Subscription;
  dictionary: any;

  constructor(private listService: ListPagedService, private route: ActivatedRoute, languageService: LanguageService) {
    this.loading = true;
    this.userList = window.history.state;
    this.dictionary = languageService.dictionary;
  }

  ngOnInit() {
    this.listService.pages$.subscribe(resp => {
      if (!resp.error) {
        this.loading = false;
        this.problems = <any>resp.response?.content;
        this.pageInfo = extractPageInfo(<any>resp.response);
      }
    });
    this.route.params.subscribe(({id}) => {
      this.subscription?.unsubscribe();
      this.subscription = this.listService.lists$.subscribe(lists => {
        this.userList = <any>lists.find(list => list.id === Number(id));
        this.listService.setListId(this.userList.id);
        this.listService.change(0, true);
      });
    });
  }

  changePage(page: number) {
    this.listService.change(page - 1);
  }

  onListActionClick(action: 'EDIT' | 'DELETE') {
    this.listService.postListActionEvent({action, id: this.userList.id});
  }

  onTrashClick(problemId: number) {
    this.listService.deleteListProblem(this.userList.id, problemId);
  }
}
