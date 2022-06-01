import { Component, Input } from '@angular/core';
import { SubmissionRow } from 'src/app/models/submission.model';

@Component({
  selector: 'app-submissions-table',
  templateUrl: './submissions-table.component.html',
})
export class SubmissionsTableComponent {
  @Input() submissions!: SubmissionRow[];
  thCommonClasses: string;
  tdCommonClasses: string;

  constructor() {
    this.thCommonClasses = 'border-bottom-0 border-end px-2 py-3';
    this.tdCommonClasses = 'border-end px-2 py-3'
  }

  getRowIdxClass(rowIdx: number) : string {
    if (rowIdx === this.submissions.length - 1)
      return 'border-bottom';
    return '';
  }
}
