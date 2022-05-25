import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LanguageService } from 'src/app/base/language.base';
import { PageInfo } from 'src/app/models/page-info.model';
import { PreviousContributionRow } from 'src/app/models/problem-contribution.model';

@Component({
  selector: 'app-contributions-table',
  templateUrl: './contributions-table.component.html'
})
export class ContributionsTableComponent {
  @Input() contributions!: PreviousContributionRow[];
  @Input() pageInfo!: PageInfo;
  @Output() pageChange = new EventEmitter<number>();
  dictionary: any;

  constructor(languageService: LanguageService) {
    this.dictionary = languageService.dictionary;
  }
}
