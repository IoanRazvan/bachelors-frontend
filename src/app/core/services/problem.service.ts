import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ProblemReponse } from "src/app/models/problem.model";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ProblemService {
    private endpoint = `${environment.apiRoot}/problem`;

    constructor(private http: HttpClient) {
    }

    getProblem(id : number) : Observable<ProblemReponse> {
        return <any>this.http.get(`${this.endpoint}/${id}`);
    }
}