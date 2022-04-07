import { Injectable } from "@angular/core";
import { ReplaySubject, Subject } from "rxjs";
import { ProblemContributionService } from "src/app/core/services/problem-contribution.service";
import { Page } from "src/app/models/page.model";
import { ProblemContributionResponse } from "src/app/models/problem-contribution.model";
import { ServerResponse } from "src/app/models/server-response.model";

@Injectable({
    providedIn: 'root'
})
export class ContributeProblemService {
    private contributions: Subject<ServerResponse<Page<ProblemContributionResponse>>> = new ReplaySubject(1);
    readonly contributions$ = this.contributions.asObservable();
    private serverPageSize = 16;
    private clientPageSize = 8;
    private currentServerPage!: Page<ProblemContributionResponse>;


    constructor(private apiService: ProblemContributionService) {
    }

    change(page: number, force: boolean = false) {
        const requestedServerPage = Page.convertPageNumber(page, this.clientPageSize, this.serverPageSize);
        if (this.currentServerPage == null || requestedServerPage != this.currentServerPage.page || force) {
            this.apiService.getContributions(requestedServerPage, this.serverPageSize).subscribe({
                next: (resp) => {
                    this.currentServerPage = new Page(resp);
                    this.contributions.next({
                        response: this.currentServerPage.convertPage(page, this.clientPageSize),
                        error: false
                    })
                },
                error: () => this.contributions.next({
                    error: true
                })
            });
        } else {
            this.contributions.next({
                response: this.currentServerPage.convertPage(page, this.clientPageSize),
                error: false
            });
        }
    }
}