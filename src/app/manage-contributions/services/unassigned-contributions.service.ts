import { Injectable } from "@angular/core";
import { Observable, ReplaySubject, Subject } from "rxjs";
import { PagedServiceBase, QueryAndSorting, ResultObservableAdapter } from "src/app/base/paged-service.base";
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
            request(page : number, pageSize: number, extras?: QueryAndSorting): Observable<any> {
                return apiService.getUnassignedContributions(page, pageSize, <any>extras?.query, <any>extras?.sorting);
            }
        }
    }

    override change(page: number, force?: boolean, extras ?: QueryAndSorting): void {
        if (!extras)
            super.change(page, force, {query: this.currentServerPage.query, sorting: this.currentServerPage.sorting})
        else
            super.change(page, force, extras)
    }

    setQuery(query: string) {
        super.change(0, false, {query, sorting: this.currentServerPage.sorting})
    }

    setSorting(sorting: SortingType) {
        super.change(0, false, {query: this.currentServerPage.query, sorting});
    }

    override isPageNotCached(requestedServerPage: number, force: boolean, extras: QueryAndSorting): boolean {
        return super.isPageNotCached(requestedServerPage, force) || extras.query != this.currentServerPage.query || extras.sorting != this.currentServerPage.sorting;
    }
}