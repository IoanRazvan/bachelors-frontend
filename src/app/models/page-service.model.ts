import { Observable } from "rxjs";

export interface ResultObservableAdapter {
    request(page: number, pageSize: number, parameters?: {[key : string] : string}): Observable<any>;
}
