import { Component, Input, OnChanges } from '@angular/core';
import { LanguageService } from 'src/app/base/language.base';
import { CodeRunnerResult } from 'src/app/models/code-runner.model';

@Component({
  selector: 'app-runner-result-window',
  templateUrl: './runner-result-window.component.html',
})
export class RunnerResultWindowComponent implements OnChanges {
  @Input() runnerResult!: CodeRunnerResult;
  @Input() ranCode!: boolean;
  @Input() checkingCode!: boolean;
  @Input() input!: string;
  statu2Error: string[];
  errorType!: string;
  errorDetails!: string;
  acceptedFields!: any[];
  dictionary: any;

  constructor(languageService: LanguageService) {
    this.statu2Error = ["", "Compile Error", "Runtime Error", "Time Limit Exceeded", "Wrong Answer"];
    this.dictionary = languageService.dictionary;
  }

  ngOnChanges(): void {
    if (this.runnerResult) {
      this.errorType = this.statu2Error[this.runnerResult.status];
      this.errorDetails = this.runnerResult.error;
      this.acceptedFields = [{label: this.dictionary.input, value: this.input}, {label: this.dictionary.stdout, value: this.runnerResult.stdout}, {label: this.dictionary.output, value: this.runnerResult.output}]
    }
  }
}
