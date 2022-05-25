import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LanguageService } from 'src/app/base/language.base';
import { ProblemContributionService } from 'src/app/core/services/problem-contribution.service';
import { ProblemContributionResponse } from 'src/app/models/problem-contribution.model';
import { Action, ClickEvent } from 'src/app/shared/components/contribution-view/contribution-view.component';
import { ToastMessageService } from 'src/app/shared/services/toast-message.service';
import { NotificationService } from '../../services/notifcation.service';

@Component({
  selector: 'app-assigned-contribution',
  templateUrl: './assigned-contribution.component.html',
})
export class AssignedContributionComponent implements OnInit {
  id!: number;
  data!: ProblemContributionResponse;
  loading: boolean;
  actions!: Action[];
  errorStatus: number;
  dictionary: any;

  constructor(private route: ActivatedRoute, private router : Router, private service: ProblemContributionService, private notificationService: NotificationService, private messageService: ToastMessageService, languageService: LanguageService) {
    this.loading = true;
    this.errorStatus = 0;
    this.dictionary = languageService.dictionary;
  }

  onActionClick(event: ClickEvent) {
    if (event.idx === 0) {
      this.router.navigate(['accept'], {relativeTo: this.route});
    } else {
      this.router.navigate(['reject'], {relativeTo: this.route});
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe(({id}) => {
      this.id = id;
      this.service.getContribution(id).subscribe({
        next: (resp) => {
          this.data = resp;
          this.loading = false;
          this.notificationService.readOne((value : any) => {
            this.messageService.addMessage(value.message, value.type, value.options);
          });
          if (resp.status == "PENDING") {
            this.actions = [{
              text: this.dictionary.accept,
              class: 'link-success text-decoration-none',
              loading: false
            },{
              text: this.dictionary.reject,
              class: 'link-danger text-decoration-none',
              loading: false
            }];
          }
        },
        error: (err) => {
          this.errorStatus = err.status || 1;
          this.loading = false;
        }
      });
    });
  }
}
