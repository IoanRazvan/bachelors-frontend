import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { RunnerResult } from "src/app/models/runner-result.model";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class RunnerService {
    private endpoint = `${environment.apiRoot}/code-runner`
    
    constructor(private http: HttpClient) {
    }

    checkProgram(code: string, langId: number, input : string[]) : Observable<RunnerResult> {
        return <any>this.http.post(`${this.endpoint}`, {
            code,
            langId,
            input
        });
    }
}