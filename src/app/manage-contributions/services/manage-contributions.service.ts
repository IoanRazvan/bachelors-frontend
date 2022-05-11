import { Injectable } from "@angular/core";
import { Observable, ReplaySubject, Subject } from "rxjs";
import { PagedServiceBase, ResultObservableAdapter } from "src/app/base/paged-service.base";
import { ContributionsManagementService } from "src/app/core/services/contributions-mananagement.service";
import { Page } from "src/app/models/page.model";
import { UnassignedContributionRow } from "src/app/models/problem-contribution.model";
import { ServerResponse } from "src/app/models/server-response.model";

@Injectable({
    providedIn: 'root'
})
export class ManageContributionsService extends PagedServiceBase {
    protected override pagesSubject: Subject<ServerResponse<Page<UnassignedContributionRow>>> = new ReplaySubject(1);
    public override readonly pages$ = this.pagesSubject.asObservable();
    protected override serverPageSize = 16;
    protected override clientPageSize = 8;
    protected override currentServerPage!: Page<UnassignedContributionRow>;
    protected override service!: ResultObservableAdapter;
    
    constructor(private apiService: ContributionsManagementService) {
        super();
        this.service = {
            request(page : number, pageSize: number): Observable<any> {
                return apiService.getAvailableContributions(page, pageSize);
            }
        }
    }

    override change(page: number, force?: boolean): void {
        super.change(page, force);
    }

}