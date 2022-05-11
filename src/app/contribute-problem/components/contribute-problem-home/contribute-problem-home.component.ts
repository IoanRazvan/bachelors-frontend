import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LanguageService } from 'src/app/core/base/language.base';
import { PageInfo } from 'src/app/models/page-info.model';
import { PreviousContributionRow } from 'src/app/models/problem-contribution.model';
import { ToastMessageService } from 'src/app/shared/services/toast-message.service';
import { ContributeProblemService } from '../../services/contribute-problem.service';

@Component({
  selector: 'app-contribute-problem-home',
  templateUrl: './contribute-problem-home.component.html'
})
export class ContributeProblemHomeComponent implements OnInit, OnDestroy {
  dictionary: any;
  contributions: PreviousContributionRow[] = [];
  pageInfo !: PageInfo;
  loading = true;
  subscription!: Subscription;

  constructor(languageService: LanguageService, private contributionsService: ContributeProblemService, private messageService: ToastMessageService) {
    this.dictionary = languageService.dictionary;
  }

  ngOnInit(): void {
    this.subscription = this.contributionsService.pages$.subscribe((res) => {
      if (!res.error) {
        const response = <any>res.response;
        this.loading = false;
        this.contributions = response.content;
        this.pageInfo = {
          last: response.last,
          first: response.first,
          page: response.page + 1
        }
      }
      else {
        this.loading = false;
        this.contributions = [];
        this.messageService.addError(this.dictionary.contributeProblemHomeFetchError, {sticky: true})
      }
    });
    this.changeContributionsPage(0, true);
  }
  
  changeContributionsPage(page: number, force: boolean = false) {
    this.loading = true;
    this.contributionsService.change(page, force);
  }

  ngOnDestroy(): void {
      this.messageService.clear();
      this.subscription.unsubscribe();
  }
}
