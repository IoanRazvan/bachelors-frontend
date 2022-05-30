import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ProgrammingLanguage } from "src/app/models/programming-language.model";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ProgrammingLanguageService {
    private endpoint : string = `${environment.apiRoot}/programming-language`;

    constructor(private http: HttpClient) {
    }

    getAll() : Observable<ProgrammingLanguage[]> {
        return <any>this.http.get(this.endpoint);
    }
}