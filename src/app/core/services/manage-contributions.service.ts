import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ParamterizedPage, SortingType } from "src/app/models/page.model";
import { AssignedContributionRow, AssignedContributionStatusCount, ProblemContributionStatus, UnassignedContributionRow } from "src/app/models/problem-contribution.model";
import { Problem } from "src/app/models/problem.model";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ManageContributionsService {
    private endpoint: string = `${environment.apiRoot}/manage-contributions`
    
    constructor(private http: HttpClient) {
    }

    getUnassignedContributions(page: number, size : number, query: string = "", order: SortingType = "descending") : Observable<ParamterizedPage<UnassignedContributionRow>> {
        return <any>this.http.get(`${this.endpoint}/unassigned?page=${page}&size=${size}&q=${query}&order=${order}`);
    }

    getAssignedContributions(page: number, size: number, query: string = "", order: SortingType = "descending", status: ProblemContributionStatus | '' = '') : Observable<ParamterizedPage<AssignedContributionRow>> {
        return <any>this.http.get(`${this.endpoint}/assigned?page=${page}&size=${size}&q=${query}&order=${order}&status=${status}`);
    }

    assignContribution(contributionId: string) : Observable<any> {
        return this.http.put(`${this.endpoint}/assign/${contributionId}`, null);
    }

    rejectContribution(contributionId: string, statusDetails: string) : Observable<any> {
        return this.http.put(`${this.endpoint}/reject/${contributionId}`, {
            statusDetails
        });
    }

    acceptContribution(contributionId: string, problem: Problem) : Observable<any> {
        return this.http.put(`${this.endpoint}/accept/${contributionId}`, problem);
    }

    getStatistics(): Observable<AssignedContributionStatusCount[]> {
        return <any>this.http.get(`${this.endpoint}/statistics`);
    }
}