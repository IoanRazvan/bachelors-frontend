import { Observable, Subject } from "rxjs";
import { Page } from "../models/page.model";

export abstract class PagedServiceBase {
    protected pagesSubject!: Subject<any>;
    public readonly pages$!: Observable<any>;
    protected serverPageSize!: number;
    protected clientPageSize!: number;
    protected currentServerPage!: Page<any>;
    protected resultObservable!: Observable<any>;

    change(page: number, force: boolean = false) {
        const requestedServerPage = Page.convertPageNumber(page, this.clientPageSize, this.serverPageSize);
        if (this.currentServerPage == null || requestedServerPage != this.currentServerPage.page || force) {
            this.resultObservable.subscribe({
                next: (resp : any) => {
                    this.currentServerPage = new Page(resp);
                    this.pagesSubject.next({
                        response: this.currentServerPage.convertPage(page, this.clientPageSize),
                        error: false
                    })
                },
                error: () => this.pagesSubject.next({
                    error: true
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