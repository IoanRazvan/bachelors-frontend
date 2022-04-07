import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LanguageService } from 'src/app/core/base/language.base';
import { PageInfo } from 'src/app/models/page-info.model';
import { ProblemContributionResponse } from 'src/app/models/problem-contribution.model';

@Component({
  selector: 'app-contributions-table',
  templateUrl: './contributions-table.component.html',
  styleUrls: ['contributions-table.style.css']
})
export class ContributionsTableComponent {
  @Input() contributions!: ProblemContributionResponse[];
  @Input() pageInfo!: PageInfo;
  @Output() pageChange = new EventEmitter<number>();
  dictionary: any;

  constructor(languageService: LanguageService) {
    this.dictionary = languageService.dictionary;
  }
}
