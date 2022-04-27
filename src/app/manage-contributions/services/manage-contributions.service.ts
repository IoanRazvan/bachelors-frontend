import { Injectable } from "@angular/core";
import { Observable, ReplaySubject, Subject } from "rxjs";
import { PagedServiceBase } from "src/app/base/paged-service.base";
import { ContributionsManagementService } from "src/app/core/services/contributions-mananagement.service";
import { Page } from "src/app/models/page.model";
import { ProblemContributionResponse } from "src/app/models/problem-contribution.model";
import { ServerResponse } from "src/app/models/server-response.model";

@Injectable({
    providedIn: 'root'
})
export class ManageContributionsService extends PagedServiceBase {
    protected override pagesSubject: Subject<ServerResponse<Page<ProblemContributionResponse>>> = new ReplaySubject(1);
    public override readonly pages$ = this.pagesSubject.asObservable();
    protected override serverPageSize = 16;
    protected override clientPageSize = 8;
    protected override currentServerPage!: Page<ProblemContributionResponse>;
    protected override resultObservable!: Observable<Page<ProblemContributionResponse>>;
    
    constructor(private apiService: ContributionsManagementService) {
        super();
    }

    override change(page: number, force?: boolean): void {
        this.resultObservable = this.apiService.getAvailableContributions(page, this.serverPageSize);
        super.change(page, force);
    }

}