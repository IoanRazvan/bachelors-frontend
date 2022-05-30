import { Component, Input, OnChanges } from '@angular/core';
import { LanguageService } from 'src/app/base/language.base';
import { CodeRunnerResult, RunnerResultStatus } from 'src/app/models/code-runner.model';

@Component({
  selector: 'app-display-runner-result',
  templateUrl: './display-runner-result.component.html',
})
export class DisplayRunnerResultComponent implements OnChanges {
  @Input() runnerResult!: CodeRunnerResult;
  @Input() input!: string;
  titles: string[];
  acceptedFields!: any[];
  wrongAnswerFields!: any[];
  dictionary: any;
  
  constructor(languageService: LanguageService) {
    this.dictionary = languageService.dictionary;
    this.titles = ['Accepted Answer', 'Compile Error', 'Runtime Error', 'Time Limit Exceeded', 'Wrong Answer'];
    this.input = "";
  }

  ngOnChanges(): void {
    this.acceptedFields = [{label: this.dictionary.input, value: this.input}, {label: this.dictionary.stdout, value: this.runnerResult.stdout}, {label: this.dictionary.output, value: this.runnerResult.output}];
    this.wrongAnswerFields = [{label: this.dictionary.input, value: this.runnerResult.wrongAnswer.input}, {label: "Asteptat", value: this.runnerResult.wrongAnswer.expected}, {label: "Real", value: this.runnerResult.wrongAnswer.actual}];
  }

  getTitleStyleClass(status: number) : string {
    if (status === RunnerResultStatus.ACCEPTED_ANSWER)
      return 'text-success';
    return 'text-danger'
  }
}
