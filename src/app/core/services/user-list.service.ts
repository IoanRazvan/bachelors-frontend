import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserListResponse, UserListRow } from "src/app/models/user-list.model";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class UserListService {
    private endpoint: string = `${environment.apiRoot}/user-list`;

    constructor(private http : HttpClient) {
    }

    getLists(problemId: number) : Observable<UserListRow[]> {
        return <any>this.http.get(`${this.endpoint}/problem/${problemId}`);     
    }

    addList(listTitle: string) : Observable<UserListResponse> {
        return <any>this.http.post(`${this.endpoint}`, {
            listTitle
        });
    }

    updateList(id: number, listTitle: string) : Observable<UserListResponse> {
        return <any>this.http.put(`${this.endpoint}/${id}`, {
            listTitle
        });
    }

    getAll() : Observable<UserListResponse[]> {
        return <any>this.http.get(this.endpoint);
    }

    deleteList(id: number) : Observable<any> {
        return <any>this.http.delete(`${this.endpoint}/${id}`);
    }
}