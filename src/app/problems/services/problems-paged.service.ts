import { Injectable } from "@angular/core";
import { ServerResponse } from "src/app/models/server-response.model";
import { ParamterizedPage } from "src/app/models/page.model";
import { ProblemRow, ProblemStatus } from "src/app/models/problem.model";
import { PagedServiceBase } from '../../base/paged-service.base'
import { Subject } from "rxjs";
import { ResultObservableAdapter } from "src/app/models/page-service.model";
import { ProblemService } from "src/app/core/services/problem.service";
import { ProblemDifficulty } from "src/app/models/category.model";

@Injectable({
    providedIn: 'root'
})
export class ProblemPagedService extends PagedServiceBase {
    protected override pagesSubject: Subject<ServerResponse<ParamterizedPage<ProblemRow>>> = new Subject();
    public override readonly pages$ = this.pagesSubject.asObservable();
    protected override serverPageSize: number = 20;
    protected override clientPageSize: number = 10;
    protected override currentServerPage!: ParamterizedPage<ProblemRow>;
    protected override service!: ResultObservableAdapter;

    constructor(apiService: ProblemService) {
        super();
        this.service = {
            request(page: number, pageSize: number, paramters: { [key: string]: any }) {
                return apiService.getProblems(page, pageSize, paramters);
            }
        }
    }

    override isPageNotCached(requestedServerPage: number, force: boolean, parameters?: { [key: string]: string }): boolean {
        if (parameters)
            return super.isPageNotCached(requestedServerPage, force, parameters) || parameters['query'] !== this.currentServerPage.parameters['query'] || parameters['difficulty'] !== this.currentServerPage.parameters['difficulty'] || parameters['status'] != this.currentServerPage.parameters['status'] || !this.arrayEquality(<any>parameters['categories'], <any>this.currentServerPage.parameters['categories'])
        return super.isPageNotCached(requestedServerPage, force, parameters)
    }

    private arrayEquality(array1: number[], array2: number[]) {
        if (array1 === null && array2 !== null || array1 !== null && array2 === null)
            return false;
        if (array1 === null && array2 === null)
            return true;
        return array1.length === array2.length && array1.every(array1Val => array2.indexOf(array1Val) !== -1);
    }

    setQuery(query: string) {
        super.change(0, false, Object.assign({}, this.currentServerPage.parameters, {query}));
    }

    setStatus(status?: ProblemStatus) {
        super.change(0, false, Object.assign({}, this.currentServerPage.parameters, {status}));
    }

    setDifficulty(difficulty?: ProblemDifficulty) {
        super.change(0, false, Object.assign({}, this.currentServerPage.parameters, {difficulty}));
    }

    setCategories(categories: number[]) {
        super.change(0, false, Object.assign({}, this.currentServerPage.parameters, {categories}));
    }

    setParameters(parameters: {[key: string] : any}) {
        super.change(0, false, parameters);
    }
}