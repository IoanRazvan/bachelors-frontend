import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
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
}
