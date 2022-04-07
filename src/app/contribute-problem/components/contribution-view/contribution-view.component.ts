import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProblemContributionService } from 'src/app/core/services/problem-contribution.service';
import { ProblemContributionResponse } from 'src/app/models/problem-contribution.model';

@Component({
  selector: 'app-contribution-view',
  templateUrl: './contribution-view.component.html',
})
export class ContributionViewComponent implements OnInit {
  id!: string;
  contribution!: ProblemContributionResponse;
  loading = true;
  error = false;


  constructor(private route: ActivatedRoute, private apiService: ProblemContributionService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(({ id }) => {
      this.id = id;
      this.apiService.getContribution(id).subscribe({
        next: response => {
          this.contribution = response;
          this.loading = false;
        },
        error: () => {
          this.loading = true;
          this.error = true;
        }
      })
    })
  }
}
