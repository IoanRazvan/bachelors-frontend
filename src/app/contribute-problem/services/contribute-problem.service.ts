import { Injectable } from "@angular/core";
import { Observable, ReplaySubject, Subject } from "rxjs";
import { PagedServiceBase } from "src/app/base/paged-service.base";
import { ProblemContributionService } from "src/app/core/services/problem-contribution.service";
import { Page } from "src/app/models/page.model";
import { PreviousContributionRow } from "src/app/models/problem-contribution.model";
import { ServerResponse } from "src/app/models/server-response.model";

@Injectable({
    providedIn: 'root'
})
export class ContributeProblemService extends PagedServiceBase {
    protected override pagesSubject: Subject<ServerResponse<Page<PreviousContributionRow>>> = new ReplaySubject(1);
    public override readonly pages$ = this.pagesSubject.asObservable();
    protected override serverPageSize = 16;
    protected override clientPageSize = 8;
    protected override currentServerPage!: Page<PreviousContributionRow>;
    protected override resultObservable!: Observable<Page<PreviousContributionRow>>;


    constructor(private apiService: ProblemContributionService) {
        super();
    }

    override change(page: number, force: boolean = false) {
        this.resultObservable = this.apiService.getContributions(page, this.serverPageSize);
        super.change(page, force);
    }
}