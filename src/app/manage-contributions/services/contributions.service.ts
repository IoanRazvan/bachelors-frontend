import { ReplaySubject, Subject } from "rxjs";
import { PagedServiceBase } from "src/app/base/paged-service.base";
import { ResultObservableAdapter } from "src/app/models/page-service.model";
import { Page, ParamterizedPage, SortingType } from "src/app/models/page.model";
import { ProblemContributionStatus, UnassignedContributionRow } from "src/app/models/problem-contribution.model";
import { ServerResponse } from "src/app/models/server-response.model";

export class ContributionsService extends PagedServiceBase {
    protected override pagesSubject: Subject<ServerResponse<Page<UnassignedContributionRow>>> = new ReplaySubject(1);
    public override readonly pages$ = this.pagesSubject.asObservable();
    protected override serverPageSize = 16;
    protected override clientPageSize = 8;
    protected override currentServerPage!: ParamterizedPage<UnassignedContributionRow>;
    protected override service!: ResultObservableAdapter;

    constructor(service : ResultObservableAdapter) {
        super();
        this.service = service;
    }

    setQuery(query: string) {
        super.change(0, false, { query, order: this.currentServerPage.parameters['order'], status: this.currentServerPage.parameters['status'] })
    }

    setSorting(order: SortingType) {
        super.change(0, false, { query: this.currentServerPage.parameters['query'], order, status: this.currentServerPage.parameters['status'] });
    }

    setStatus(status: ProblemContributionStatus) {
        super.change(0, false, { query: this.currentServerPage.parameters['query'], order : this.currentServerPage.parameters['order'], status })
    }

    override isPageNotCached(requestedServerPage: number, force : boolean, parameters?: {[key: string]: string}): boolean {
        if (parameters)
            return super.isPageNotCached(requestedServerPage, force, parameters) || parameters['query'] !== this.currentServerPage.parameters['query'] || parameters['order'] !== this.currentServerPage.parameters['order'] || parameters['status'] !== this.currentServerPage.parameters['status'];
        return super.isPageNotCached(requestedServerPage, force, parameters)
    }
}