import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LanguageService } from 'src/app/core/base/language.base';
import { ContributionsManagementService } from 'src/app/core/services/contributions-mananagement.service';
import { ProblemContributionService } from 'src/app/core/services/problem-contribution.service';
import { ProblemContributionResponse } from 'src/app/models/problem-contribution.model';
import { Action, ClickEvent } from 'src/app/shared/components/contribution-view/contribution-view.component';
import { ToastMessageService } from 'src/app/shared/services/toast-message.service';

@Component({
  selector: 'app-submitted-contribution',
  templateUrl: './submitted-contribution.component.html',
})
export class SubmittedContributionComponent implements OnInit {
  id!: string;
  contribution!: ProblemContributionResponse;
  errorStatus: number;
  loading: boolean;
  actions!: Action[];
  assigned: boolean;
  dictionary: any;

  constructor(languageService: LanguageService, private route: ActivatedRoute, private messageService: ToastMessageService, private contributionService: ProblemContributionService, private contributionManagementService: ContributionsManagementService) {
    this.assigned = false;
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
          this.actions = [{text: 'Asigneaza', class: 'link-primary text-decoration-none', loading: false}]
        },
        error: (err) => {
          this.loading = false;
          this.errorStatus = err.status || 1;
        }
      })
    })
  }

  onActionClick(event: ClickEvent) {
    switch(event.idx) {
      case 0:
        if (!this.assigned)
          this.assignContribution();
        break;
    }
  }

  assignContribution() {
    this.actions = [{...this.actions[0], loading: true}];
    this.contributionManagementService.assignContribution(this.id).subscribe({
      next: () => {
        this.assigned = true;
        this.actions = [{text: 'Accepta', class: 'link-success text-decoration-none', loading: false}, {text: 'Refuza', class: 'link-danger text-decoration-none', loading: false}];
        this.messageService.addSuccess('Contributia a fost asignata cu succes');
      },
      error: () => {
        this.actions = [{...this.actions[0], loading: false}];
        this.messageService.addError('Contributia nu a putut fi asignata');
      }
    })
  }
}
