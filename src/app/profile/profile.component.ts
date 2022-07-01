import { Component, OnInit } from '@angular/core';
import { IdentityService } from '../core/services/identity.service';
import { SubmissionService } from '../core/services/submission.service';
import { SubmissionDateCount } from '../models/submission.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  data!: any[];
  loading: boolean;

  constructor(private submissionService: SubmissionService, private identityService: IdentityService) {
    this.loading = true;
  }

  ngOnInit(): void {
    this.submissionService.getSubmissionsDateCount().subscribe((resp) => {
      this.data = resp.map(submissionDateCount => [submissionDateCount.date, submissionDateCount.count]);
      this.loading = false;
    });

    this.identityService.getUserInformation();
  }

}
