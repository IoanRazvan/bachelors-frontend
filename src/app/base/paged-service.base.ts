import { Observable, Subject } from "rxjs";
import { Page } from "../models/page.model";

export interface ResultObservableAdapter {
    request(page: number, pageSize: number): Observable<any>;
}

export abstract class PagedServiceBase {
    protected pagesSubject!: Subject<any>;
    public readonly pages$!: Observable<any>;
    protected serverPageSize!: number;
    protected clientPageSize!: number;
    protected currentServerPage!: Page<any>;
    protected service !: ResultObservableAdapter;

    change(page: number, force: boolean = false) {
        const requestedServerPage = Page.convertPageNumber(page, this.clientPageSize, this.serverPageSize);
        if (this.currentServerPage == null || requestedServerPage != this.currentServerPage.page || force) {
            this.service.request(requestedServerPage, this.serverPageSize).subscribe({
                next: (resp : any) => {
                    this.currentServerPage = new Page(resp);
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
}