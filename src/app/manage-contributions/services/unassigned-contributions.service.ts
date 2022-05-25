import { Injectable } from "@angular/core";
import { Observable, ReplaySubject, Subject } from "rxjs";
import { PagedServiceBase } from "src/app/base/paged-service.base";
import { PageServiceExtras, ResultObservableAdapter } from "src/app/models/page-service.model";
import { ContributionsManagementService } from "src/app/core/services/manage-contributions.service";
import { Page, SortedQueryPage, SortingType } from "src/app/models/page.model";
import { UnassignedContributionRow } from "src/app/models/problem-contribution.model";
import { ServerResponse } from "src/app/models/server-response.model";

@Injectable({
    providedIn: 'root'
})
export class UnassignedContributionsService extends PagedServiceBase {
    protected override pagesSubject: Subject<ServerResponse<Page<UnassignedContributionRow>>> = new ReplaySubject(1);
    public override readonly pages$ = this.pagesSubject.asObservable();
    protected override serverPageSize = 16;
    protected override clientPageSize = 8;
    protected override currentServerPage!: SortedQueryPage<UnassignedContributionRow>;
    protected override service!: ResultObservableAdapter;
    
    constructor(apiService: ContributionsManagementService) {
        super();
        this.service = {
            request(page : number, pageSize: number, extras?: PageServiceExtras): Observable<any> {
                return apiService.getUnassignedContributions(page, pageSize, extras?.query, extras?.sorting);
            }
        }
    }

    setQuery(query: string) {
        super.change(0, {query, sorting: this.currentServerPage.sorting, force: false})
    }

    setSorting(sorting: SortingType) {
        super.change(0, {query: this.currentServerPage.query, sorting, force: false});
    }

    override isPageNotCached(requestedServerPage: number, extras?: PageServiceExtras): boolean {
        if (extras)
            return super.isPageNotCached(requestedServerPage, extras) || extras.query !== this.currentServerPage.query || extras.sorting !== this.currentServerPage.sorting;
        return super.isPageNotCached(requestedServerPage, extras)
    }
}