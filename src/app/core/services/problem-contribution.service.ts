import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Page } from '../models/page.model';
import { ProblemContribution } from '../models/problem-contribution.model';

@Injectable({
  providedIn: 'root'
})
export class ProblemContributionService {
  private endpoint = `${environment.apiRoot}/problem-contribution`;

  constructor(private http: HttpClient) {
  }

  save(problemContribution : ProblemContribution) : Observable<ProblemContribution> {
    return <any>this.http.post(this.endpoint, problemContribution);
  }

  get(page: number, size: number) : Observable<Page<ProblemContribution>> {
    return <any>this.http.get(`${this.endpoint}?page=${page}&size=${size}`);
  }
}
