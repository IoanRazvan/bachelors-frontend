import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Page } from "src/app/models/page.model";
import { ListProblem } from "src/app/models/problem.model";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class UserListProblemService {
    private endpoint: string = `${environment.apiRoot}/user-list-problem`

    constructor(private http: HttpClient) {
    }

    saveUserListProblem(problemId : number, listId: number) : Observable<any> {
        return this.http.post(`${this.endpoint}`, {
            problemId,
            listId
        });
    }

    removeUserListProblem(problemId : number, listId : number) : Observable<any> {
        return this.http.delete(`${this.endpoint}`, {
            body: {
                problemId,
                listId
            }
        });
    }

    getListProblems(listId: number, page: number, size: number) : Observable<Page<ListProblem>> {
        return <any> this.http.get(`${this.endpoint}/${listId}?page=${page}&size=${size}`);
    }
}