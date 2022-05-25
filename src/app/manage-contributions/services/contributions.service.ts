import { ReplaySubject, Subject } from "rxjs";
import { PagedServiceBase } from "src/app/base/paged-service.base";
import { PageServiceExtras, ResultObservableAdapter } from "src/app/models/page-service.model";
import { Page, SortedQueryPage, SortingType } from "src/app/models/page.model";
import { ProblemContributionStatus, UnassignedContributionRow } from "src/app/models/problem-contribution.model";
import { ServerResponse } from "src/app/models/server-response.model";

export class ContributionsService extends PagedServiceBase {
    protected override pagesSubject: Subject<ServerResponse<Page<UnassignedContributionRow>>> = new ReplaySubject(1);
    public override readonly pages$ = this.pagesSubject.asObservable();
    protected override serverPageSize = 16;
    protected override clientPageSize = 8;
    protected override currentServerPage!: SortedQueryPage<UnassignedContributionRow>;
    protected override service!: ResultObservableAdapter;

    constructor(service : ResultObservableAdapter) {
        super();
        this.service = service;
    }

    setQuery(query: string) {
        super.change(0, { query, sorting: this.currentServerPage.sorting, force: false, status: this.currentServerPage.status })
    }

    setSorting(sorting: SortingType) {
        super.change(0, { query: this.currentServerPage.query, sorting, force: false, status: this.currentServerPage.status });
    }

    setStatus(status: ProblemContributionStatus) {
        super.change(0, { query: this.currentServerPage.query, sorting : this.currentServerPage.sorting, force: false, status })
    }

    override isPageNotCached(requestedServerPage: number, extras?: PageServiceExtras): boolean {
        if (extras)
            return super.isPageNotCached(requestedServerPage, extras) || extras.query !== this.currentServerPage.query || extras.sorting !== this.currentServerPage.sorting || extras.status !== this.currentServerPage.status;
        return super.isPageNotCached(requestedServerPage, extras)
    }
}