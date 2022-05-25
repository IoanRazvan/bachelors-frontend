import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { LanguageService } from 'src/app/base/language.base';
import { ProblemContributionService } from 'src/app/core/services/problem-contribution.service';
import { ProblemContributionResponse } from 'src/app/models/problem-contribution.model';
import { Action, ClickEvent } from 'src/app/shared/components/contribution-view/contribution-view.component';
import { ToastMessageService } from 'src/app/shared/services/toast-message.service';

@Component({
  selector: 'app-personal-contribution-view',
  templateUrl: './personal-contribution-view.component.html',
})
export class PersonalContributionViewComponent implements OnInit {
  id!: string;
  contribution!: ProblemContributionResponse;
  actions!: Action[];
  loading = true;
  errorStatus: number = 0;
  dictionary: any;


  constructor(private route: ActivatedRoute, private apiService: ProblemContributionService, private confirmationService: ConfirmationService, private messageService: ToastMessageService, languageService: LanguageService, private router: Router) {
    this.dictionary = languageService.dictionary;
  }

  ngOnInit(): void {
    this.route.params.subscribe(({ id }) => {
      this.id = id;
      this.apiService.getContribution(id).subscribe({
        next: response => {
          this.loading = false;
          this.contribution = response;
          if (response.status === 'PENDING') {
            this.actions = [{text: this.dictionary.update, class: 'link-primary text-decoration-none', loading: false}, {text: this.dictionary.delete, class: 'link-danger text-decoration-none', loading: false}]
          }
        },
        error: (err) => {
          this.loading = false;
          this.errorStatus = err.status || 1;
        }
      })
    })
  }

  onActionClick(event: ClickEvent) {
    switch (event.idx) {
      case 0:
        this.router.navigate(['../form', this.contribution.id], {relativeTo: this.route});
        break;
      case 1:
        this.confirmDelete(event.target);
        break;
    }
  }

  confirmDelete(event: any): boolean {
    this.confirmationService.confirm({
      target: event.target,
      message: this.dictionary.deleteContributionConfirmMessage,
      icon: 'pi pi-exclamation-triangle',
      accept: () => this.deleteContribution(),
      acceptLabel: this.dictionary.yes,
      rejectLabel: this.dictionary.no
    });
    return false;
  }

  private deleteContribution() {
    this.actions = this.actions.map((val, idx) => {
      if (idx == 1)
        return {...val, loading: true};
      return val;
    });
    this.apiService.delete(this.id).subscribe({
      next: () => {
        this.messageService.addSuccess(this.dictionary.deleteContributionToastSuccessDetail);
        this.actions = [];
      },
      error: () => {
        this.messageService.addError(this.dictionary.deleteContributionToastErrorDetail);
        this.actions = this.actions.map((val, idx) => {
          if (idx == 1)
            return {...val, loading: false};
          return val;
        });
      }
    });
  }
}
