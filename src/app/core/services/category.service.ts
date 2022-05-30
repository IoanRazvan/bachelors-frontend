import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Category } from "src/app/models/category.model";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    private endpoint = `${environment.apiRoot}/category`;

    constructor(private http: HttpClient) {
    }

    getCategories() : Observable<Category[]> {
        return <any>this.http.get(this.endpoint);
    }
}