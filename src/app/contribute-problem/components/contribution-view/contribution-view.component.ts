import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { LanguageService } from 'src/app/core/base/language.base';
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
  errorStatus: number = 0;
  wasDeleted = false;
  deleting = false;
  dictionary: any;


  constructor(private route: ActivatedRoute, private apiService: ProblemContributionService, private confirmationService: ConfirmationService, private messageService: MessageService, languageService: LanguageService) {
    this.dictionary = languageService.dictionary;
  }

  ngOnInit(): void {
    this.route.params.subscribe(({ id }) => {
      this.id = id;
      this.apiService.getContribution(id).subscribe({
        next: response => {
          this.loading = false;
          this.contribution = response;
        },
        error: (err) => {
          this.loading = false;
          this.errorStatus = err.status || 1;
        }
      })
    })
  }

  confirmDelete(event: any): boolean {
    this.confirmationService.confirm({
      target: event.target,
      message: this.dictionary.deleteContributionConfirmMessage,
      icon: 'pi pi-exclamation-triangle',
      accept: () => this.deleteContribution()
    });
    return false;
  }

  private deleteContribution() {
    this.deleting = true;
    this.apiService.delete(this.id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: this.dictionary.successSummary,
          detail: this.dictionary.deleteContributionToastSuccessDetail
        });
        this.wasDeleted = true;
        this.deleting = false;
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: this.dictionary.errorSummary,
          detail: this.dictionary.deleteContributionToastErrorDetail
        });
        this.deleting = false;
      }
    });
  }
}
