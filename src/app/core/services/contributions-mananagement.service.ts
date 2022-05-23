import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Page } from "src/app/models/page.model";
import { UnassignedContributionRow } from "src/app/models/problem-contribution.model";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ContributionsManagementService {
    private endpoint: string = `${environment.apiRoot}/manage-contributions`
    
    constructor(private http: HttpClient) {
    }

    getAvailableContributions(page: number, size : number) : Observable<Page<UnassignedContributionRow>> {
        return <any>this.http.get(`${this.endpoint}?page=${page}&size=${size}`);
    }

    assignContribution(contributionId: string) : Observable<any> {
        return this.http.put(`${this.endpoint}/${contributionId}`, null);
    }

    refuseContribution(contributionId: string, statusDetails: string) : Observable<any> {
        return this.http.put(`${this.endpoint}/refuse/${contributionId}`, {
            statusDetails
        });
    }
}