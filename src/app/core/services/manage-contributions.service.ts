import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SortedQueryPage, SortingType } from "src/app/models/page.model";
import { AssignedContributionRow, AssignedContributionStatusCount, ProblemContributionStatus, UnassignedContributionRow } from "src/app/models/problem-contribution.model";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ManageContributionsService {
    private endpoint: string = `${environment.apiRoot}/manage-contributions`
    
    constructor(private http: HttpClient) {
    }

    getUnassignedContributions(page: number, size : number, query: string = "", sorting: SortingType = "descending") : Observable<SortedQueryPage<UnassignedContributionRow>> {
        return <any>this.http.get(`${this.endpoint}/unassigned?page=${page}&size=${size}&q=${query}&order=${sorting}`);
    }

    getAssignedContributions(page: number, size: number, query: string = "", sorting: SortingType = "descending", status: ProblemContributionStatus | '' = '') : Observable<SortedQueryPage<AssignedContributionRow>> {
        return <any>this.http.get(`${this.endpoint}/assigned?page=${page}&size=${size}&q=${query}&order=${sorting}&status=${status}`);
    }

    assignContribution(contributionId: string) : Observable<any> {
        return this.http.put(`${this.endpoint}/assign/${contributionId}`, null);
    }

    rejectContribution(contributionId: string, statusDetails: string) : Observable<any> {
        return this.http.put(`${this.endpoint}/reject/${contributionId}`, {
            statusDetails
        });
    }

    getStatistics(): Observable<AssignedContributionStatusCount[]> {
        return <any>this.http.get(`${this.endpoint}/statistics`);
    }
}