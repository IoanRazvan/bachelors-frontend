import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { LanguageService } from 'src/app/core/base/language.base';
import { PageInfo } from 'src/app/models/page-info.model';
import { ProblemContributionRequest, ProblemContributionResponse } from 'src/app/models/problem-contribution.model';
import { ContributeProblemService } from '../../services/contribute-problem.service';

@Component({
  selector: 'app-contribute-problem-home',
  templateUrl: './contribute-problem-home.component.html',
  providers: [MessageService]
})
export class ContributeProblemHomeComponent implements OnInit {
  dictionary: any;
  contributions: ProblemContributionResponse[] = [];
  pageInfo !: PageInfo;
  loading = true;

  constructor(languageService: LanguageService, private contributionsService: ContributeProblemService, private messageService: MessageService) {
    this.dictionary = languageService.dictionary;
  }

  ngOnInit(): void {
    this.contributionsService.contributions$.subscribe((res) => {
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
        this.messageService.add({severity: 'error', summary: this.dictionary.toastErrorSummary, detail: this.dictionary.contributeProblemHomeFetchError, sticky: true})
      }
    });
    this.changeContributionsPage(0, true);
  }
  
  changeContributionsPage(page: number, force: boolean = false) {
    this.loading = true;
    this.contributionsService.change(page, force);
  }
}
