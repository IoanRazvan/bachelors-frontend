import { Observable, Subject } from "rxjs";
import { Page, SortedQueryPage, SortingType } from "../models/page.model";

export interface QueryAndSorting {
    query: string;
    sorting: SortingType;
}

export interface ResultObservableAdapter {
    request(page: number, pageSize: number, extras?: QueryAndSorting): Observable<any>;
}

export abstract class PagedServiceBase {
    protected pagesSubject!: Subject<any>;
    public readonly pages$!: Observable<any>;
    protected serverPageSize!: number;
    protected clientPageSize!: number;
    protected currentServerPage!: Page<any>;
    protected service !: ResultObservableAdapter;

    change(page: number, force: boolean = false, extras ?: QueryAndSorting) {
        const requestedServerPage = Page.convertPageNumber(page, this.clientPageSize, this.serverPageSize);
        if (this.isPageNotCached(requestedServerPage, force, extras)) {
            this.service.request(requestedServerPage, this.serverPageSize, extras).subscribe({
                next: (resp : any) => {
                    this.currentServerPage = resp.sorting ? new SortedQueryPage(resp) : new Page(resp);
                    this.pagesSubject.next({
                        response: this.currentServerPage.convertPage(page, this.clientPageSize),
                        error: false
                    })
                },
                error: (err) => this.pagesSubject.next({
                    error: err
                })
            });
        } else {
            this.pagesSubject.next({
                response: this.currentServerPage.convertPage(page, this.clientPageSize),
                error: false
            });
        }
    }

    isPageNotCached(requestedServerPage: number, force: boolean, _extras ?: QueryAndSorting) : boolean {
        return this.currentServerPage == null || requestedServerPage != this.currentServerPage.page || force;
    }
}