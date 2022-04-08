import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
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
  wasDeleted = false;


  constructor(private route: ActivatedRoute, private apiService: ProblemContributionService, private confirmationService: ConfirmationService, private messageService: MessageService, private location: Location) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(({ id }) => {
      this.id = id;
      // TODO handle possible error/not found
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

  confirmDelete(event: any): boolean {
    this.confirmationService.confirm({
      target: event.target,
      message: 'Esti sigur ca doresti sa stergi contributia?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.apiService.delete(this.id).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Succes',
              detail: 'Contributia a fost stearsa'
            });
            this.wasDeleted = true;
          },
          error: () => { }
        })
      }
    });
    return false;
  }

  goBack() {
    this.location.back();
  }
}
