import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserListResponse, UserListRow } from "src/app/models/user-list.model";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class UserListService {
    private endpoint: string = `${environment.apiRoot}/list`;

    constructor(private http : HttpClient) {
    }

    getLists(problemId: number) : Observable<UserListRow[]> {
        return <any>this.http.get(`${this.endpoint}/${problemId}`);     
    }

    addList(listTitle: string) : Observable<UserListResponse> {
        return <any>this.http.post(`${this.endpoint}`, {
            listTitle
        });
    }
}