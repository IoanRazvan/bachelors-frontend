import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProblemContributionRequest, ProblemContributionResponse } from 'src/app/models/problem-contribution.model';
import { environment } from 'src/environments/environment';
import { Page } from '../../models/page.model';

@Injectable({
  providedIn: 'root'
})
export class ProblemContributionService {
  private endpoint = `${environment.apiRoot}/problem-contribution`;

  constructor(private http: HttpClient) {
  }

  save(problemContribution: ProblemContributionRequest): Observable<ProblemContributionResponse> {
    return <any>this.http.post(this.endpoint, problemContribution);
  }

  update(id: string, problemContribution: ProblemContributionRequest): Observable<ProblemContributionResponse> {
    return <any>this.http.put(`${this.endpoint}/${id}`, problemContribution);
  }

  delete(id: string) : Observable<any> {
    return <any>this.http.delete(`${this.endpoint}/${id}`);
  }

  getContributions(page: number, size: number): Observable<Page<ProblemContributionResponse>> {
    return <any>this.http.get(`${this.endpoint}?page=${page}&size=${size}`);
  }

  getContribution(id: string): Observable<ProblemContributionResponse> {
    return <any>this.http.get(`${this.endpoint}/${id}`);
  }
}
