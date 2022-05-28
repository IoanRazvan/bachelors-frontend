import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CodeDetails, CodeRunnerResult } from "src/app/models/code-runner.model";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class CodeRunnerService {
    private endpoint = `${environment.apiRoot}/code-runner`
    
    constructor(private http: HttpClient) {
    }

    checkProgram(code: string, langId: number, input : string[]) : Observable<CodeRunnerResult> {
        const details : CodeDetails = {
            code,
            langId,
            input,
            output: []
        };
        return <any>this.http.post(`${this.endpoint}/check-program`, details);
    }

    checkSolutionsAgainsTestcases(details: CodeDetails[]) : Observable<CodeRunnerResult[]> {
        return <any>this.http.post(`${this.endpoint}/check-against-testcases`, details);
    }
}