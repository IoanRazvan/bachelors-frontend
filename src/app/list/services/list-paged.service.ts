import { Injectable } from '@angular/core';
import { first, map, Observable, ReplaySubject, Subject, switchAll } from 'rxjs';
import { PagedServiceBase } from 'src/app/base/paged-service.base';
import { UserListProblemService } from 'src/app/core/services/user-list-problem.service';
import { ResultObservableAdapter } from 'src/app/models/page-service.model';
import { Page } from 'src/app/models/page.model';
import { ListProblem } from 'src/app/models/problem.model';
import { ServerResponse } from 'src/app/models/server-response.model';
import { UserListResponse } from 'src/app/models/user-list.model';

export interface ListAction {
  id: number;
  action: 'EDIT' | 'DELETE';
}

@Injectable({
  providedIn: 'root'
})
export class ListPagedService extends PagedServiceBase {
  protected override serverPageSize: number = 4;
  protected override clientPageSize: number = 2;
  protected override currentServerPage!: Page<ListProblem>;
  protected override service: ResultObservableAdapter;

  protected override pagesSubject: Subject<ServerResponse<Page<ListProblem>>> = new ReplaySubject(1);
  public override readonly pages$: Observable<ServerResponse<Page<ListProblem>>> = this.pagesSubject.asObservable();

  private listsSubject: ReplaySubject<UserListResponse[]> = new ReplaySubject(1);
  public readonly lists$: Observable<UserListResponse[]> = this.listsSubject.asObservable();

  private listIdSubject: ReplaySubject<number> = new ReplaySubject(1);
  public readonly listId$: Observable<number> = this.listIdSubject.asObservable();

  private listActionSubject: Subject<ListAction> = new Subject();
  public readonly listAction$: Observable<ListAction> = this.listActionSubject.asObservable();

  constructor(private userListProblemService: UserListProblemService) {
    super();
    this.service = {
      request: (page: number, size: number): Observable<Page<ListProblem>> => {
        return this.listId$.pipe(map(id => {
          return userListProblemService.getListProblems(id, page, size)
        }), switchAll(), first());
      }
    }
  }

  setListId(listId: number) {
    this.listIdSubject.next(listId);
  }

  setLists(lists: UserListResponse[]) {
    this.listsSubject.next(lists);
  }

  postListActionEvent(listAction: ListAction) {
    this.listActionSubject.next(listAction);
  }

  deleteListProblem(userListId: number, problemId: number): Observable<any> {
    let result: Observable<any> = this.userListProblemService.removeUserListProblem(problemId, userListId);
    let currentPage: number;
    this.pages$.subscribe(page => currentPage = <any>page.response?.page);
    result.subscribe(() => {
      if (this.currentServerPage.last === true) {
        if (this.currentServerPage.content.length > 0)
          this.currentServerPage.content = this.currentServerPage.content.filter(listProblem => listProblem.id !== problemId)
        if (this.currentServerPage.content.length % this.clientPageSize === 0 && currentPage !== this.currentServerPage.page)
          this.change(currentPage - 1);
        else {
          this.pagesSubject.next({
            error: false,
            response: this.currentServerPage.convertPage(currentPage, this.clientPageSize)
          })
        }
      }
      else {
        this.change(currentPage, true);
      }
    })
    return result;
  }
}
