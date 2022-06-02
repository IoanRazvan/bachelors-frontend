import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ProblemReponse, ProblemRow } from "src/app/models/problem.model";
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

    getProblems(page: number, size: number, parameters : {[key: string] : any}) : Observable<ProblemRow[]> {
        let queryParams : string = '';
        if (parameters['status'])
            queryParams += `&status=${parameters['status']}`;
        if (parameters['difficulty'])
            queryParams += `&difficulty=${parameters['difficulty']}`;
        if (parameters['categories'] && parameters['categories'].length)
            queryParams += `&categories=${parameters['categories'].join(',')}`;
        if (parameters['query'])
            queryParams += `&query=${parameters['query']}`;
        return <any>this.http.get(`${this.endpoint}?page=${page}&size=${size}${queryParams}`);
    }
}