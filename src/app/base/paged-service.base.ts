import { Observable, Subject } from "rxjs";
import { Page, PageFactory } from "../models/page.model";
import { ResultObservableAdapter, PageServiceExtras } from "../models/page-service.model";

export abstract class PagedServiceBase {
    protected pagesSubject!: Subject<any>;
    public readonly pages$!: Observable<any>;
    protected serverPageSize!: number;
    protected clientPageSize!: number;
    protected currentServerPage!: Page<any>;
    protected service !: ResultObservableAdapter;

    change(page: number, extras ?: PageServiceExtras) {
        const requestedServerPage = Page.convertPageNumber(page, this.clientPageSize, this.serverPageSize);
        if (this.isPageNotCached(requestedServerPage, extras)) {
            this.service.request(requestedServerPage, this.serverPageSize, extras).subscribe({
                next: (resp : any) => {
                    this.currentServerPage = PageFactory.of(resp);
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

    isPageNotCached(requestedServerPage: number, extras ?: PageServiceExtras) : boolean {
        return this.currentServerPage == null || requestedServerPage != this.currentServerPage.page || !!extras?.force
    }
}