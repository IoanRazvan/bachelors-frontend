import { Component, Input } from '@angular/core';
import { LanguageService } from 'src/app/base/language.base';
import { SubmissionRow } from 'src/app/models/submission.model';

@Component({
  selector: 'app-submissions-table',
  templateUrl: './submissions-table.component.html',
  styleUrls: ['submissions-table.component.css']
})
export class SubmissionsTableComponent {
  @Input() submissions!: SubmissionRow[];
  thCommonClasses: string;
  tdCommonClasses: string;
  dictionary: any;

  constructor(languageService: LanguageService) {
    this.thCommonClasses = 'border-bottom-0 border-end px-2 py-3';
    this.tdCommonClasses = 'border-end px-2 py-3';
    this.dictionary = languageService.dictionary
  }

  getRowIdxClass(rowIdx: number) : string {
    if (rowIdx === this.submissions.length - 1)
      return 'border-bottom';
    return '';
  }
}
