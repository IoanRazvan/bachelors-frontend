import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LanguageService } from 'src/app/base/language.base';
import { ManageContributionsService } from 'src/app/core/services/manage-contributions.service';
import { ProblemContributionService } from 'src/app/core/services/problem-contribution.service';
import { ProblemContributionResponse } from 'src/app/models/problem-contribution.model';
import { Action } from 'src/app/shared/components/contribution-view/contribution-view.component';
import { ToastMessageService } from 'src/app/shared/services/toast-message.service';
import { NotificationService } from '../../services/notifcation.service';

@Component({
  selector: 'app-new-contribution',
  templateUrl: './unassigned-contribution.component.html',
})
export class UnassignedContributionComponent implements OnInit {
  id!: string;
  contribution!: ProblemContributionResponse;
  errorStatus: number;
  loading: boolean;
  actions!: Action[];
  dictionary: any;

  constructor(languageService: LanguageService, private route: ActivatedRoute, private messageService: ToastMessageService, private contributionService: ProblemContributionService, private contributionManagementService: ManageContributionsService, private router: Router, private notificationService: NotificationService) {
    this.loading = true;
    this.errorStatus = 0;
    this.dictionary = languageService.dictionary;
  }

  ngOnInit(): void {
    this.route.params.subscribe(({ id }) => {
      this.id = id;
      this.contributionService.getContribution(id).subscribe({
        next: response => {
          this.loading = false;
          this.contribution = response;
          this.actions = [{ text: this.dictionary.assign, class: 'link-primary text-decoration-none', loading: false }];
        },
        error: (err) => {
          this.loading = false;
          this.errorStatus = err.status || 1;
        }
      })
    })
  }

  onActionClick() {
    this.actions = [{ ...this.actions[0], loading: true }];
    this.contributionManagementService.assignContribution(this.id).subscribe({
      next: () => {
        this.actions = [{ ...this.actions[0], loading: false }];
        this.notificationService.addNotification(this.dictionary.contributionAssignedSuccessfully, "SUCCESS")
        this.router.navigate(['/manage-contributions/assigned', this.id])
      },
      error: () => {
        this.actions = [{ ...this.actions[0], loading: false }];
        this.messageService.addError(this.dictionary.contributionCouldNotBeAssigned);
      }
    })
  }
}
