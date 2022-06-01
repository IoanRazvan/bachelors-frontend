import { Component, Input, OnChanges } from '@angular/core';
import { LanguageService } from 'src/app/base/language.base';
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
  dictionary: any;

  constructor(languageService: LanguageService) {
    this.activeIndex = 0;
    this.dictionary = languageService.dictionary;
  }

  ngOnChanges(): void {
    if (this.checkingCode)
      this.activeIndex = 1;
  }

}
