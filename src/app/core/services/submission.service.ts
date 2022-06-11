import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Submission, SubmissionRow } from "src/app/models/submission.model";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class SubmissionService {
    private endpoint: string = `${environment.apiRoot}/submission`;

    constructor(private http: HttpClient) {
    }

    getSubmissions(problemId: number) : Observable<SubmissionRow[]> {
        return <any>this.http.get(`${this.endpoint}/problem/${problemId}`);
    }

    getSubmission(submissionId: number) : Observable<Submission> {
        return <any>this.http.get(`${this.endpoint}/${submissionId}`);
    }
}