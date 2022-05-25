import { Observable } from "rxjs";
import { SortingType } from "./page.model";
import { ProblemContributionStatus } from "./problem-contribution.model";


export interface PageServiceExtras {
    query?: string;
    sorting?: SortingType;
    force?: boolean;
    status?: ProblemContributionStatus | '';
}

export interface ResultObservableAdapter {
    request(page: number, pageSize: number, extras?: PageServiceExtras): Observable<any>;
}
