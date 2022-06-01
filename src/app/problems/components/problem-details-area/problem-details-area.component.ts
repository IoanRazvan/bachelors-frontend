import { Component, Input, OnChanges } from '@angular/core';
import { CodeRunnerResult } from 'src/app/models/code-runner.model';
import { ProblemReponse } from 'src/app/models/problem.model';
import { SubmissionRow } from 'src/app/models/submission.model';

@Component({
  selector: 'app-problem-details-area',
  templateUrl: './problem-details-area.component.html',
})
export class ProblemDetailsAreaComponent implements OnChanges {
  @Input() runnerResult!: CodeRunnerResult;
  @Input() checkingCode!: boolean;
  @Input() problem!: ProblemReponse;
  @Input() submissions!: SubmissionRow[];
  activeIndex: number;

  constructor() {
    this.activeIndex = 0;
  }

  ngOnChanges(): void {
    if (this.checkingCode)
      this.activeIndex = 1;
  }

}
