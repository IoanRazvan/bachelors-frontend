import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
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
}