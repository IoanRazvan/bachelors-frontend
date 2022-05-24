import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SortedQueryPage, SortingType } from "src/app/models/page.model";
import { UnassignedContributionRow } from "src/app/models/problem-contribution.model";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ContributionsManagementService {
    private endpoint: string = `${environment.apiRoot}/manage-contributions`
    
    constructor(private http: HttpClient) {
    }

    getAvailableContributions(page: number, size : number, query: string, sorting: SortingType) : Observable<SortedQueryPage<UnassignedContributionRow>> {
        query = query || '';
        sorting = sorting || 'descending';
        return <any>this.http.get(`${this.endpoint}/unassigned?page=${page}&size=${size}&q=${query}&order=${sorting}`);
    }

    assignContribution(contributionId: string) : Observable<any> {
        return this.http.put(`${this.endpoint}/assign/${contributionId}`, null);
    }

    rejectContribution(contributionId: string, statusDetails: string) : Observable<any> {
        return this.http.put(`${this.endpoint}/reject/${contributionId}`, {
            statusDetails
        });
    }
}