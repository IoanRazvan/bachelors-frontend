import { Observable } from "rxjs";
import { SortingType } from "./page.model";


export interface PageServiceExtras {
    query?: string;
    sorting?: SortingType;
    force?: boolean;
}

export interface ResultObservableAdapter {
    request(page: number, pageSize: number, extras?: PageServiceExtras): Observable<any>;
}
