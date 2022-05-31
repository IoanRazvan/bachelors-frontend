import { Observable, Subject } from "rxjs";
import { ResultObservableAdapter } from "../models/page-service.model";
import { Page, PageFactory } from "../models/page.model";

export abstract class PagedServiceBase {
    protected pagesSubject!: Subject<any>;
    public readonly pages$!: Observable<any>;
    protected serverPageSize!: number;
    protected clientPageSize!: number;
    protected currentServerPage!: Page<any>;
    protected service !: ResultObservableAdapter;

    change(page: number, force: boolean = false, paramters ?: {[key: string] : string}) {
        const requestedServerPage = Page.convertPageNumber(page, this.clientPageSize, this.serverPageSize);
        if (this.isPageNotCached(requestedServerPage, force, paramters)) {
            this.service.request(requestedServerPage, this.serverPageSize, paramters).subscribe({
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

    isPageNotCached(requestedServerPage: number, force: boolean, _parameters?: {[key: string] : string}) : boolean {
        return this.currentServerPage == null || requestedServerPage != this.currentServerPage.page || force
    }
}