import { Component, Input, OnChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { LanguageService } from 'src/app/base/language.base';
import { CodeRunnerResult } from 'src/app/models/code-runner.model';

@Component({
  selector: 'app-runner-details-tabview',
  templateUrl: './runner-details-tabview.component.html',
})
export class RunnerDetailsTabviewComponent implements OnChanges {
  @Input() checkingCode !: boolean;
  @Input() runnerResult!: CodeRunnerResult;
  @Input() input!: AbstractControl;
  activePanelIndex: number = 0;
  dictionary: any;

  constructor(languageService: LanguageService) {
    this.dictionary = languageService.dictionary;
  }

  ngOnChanges(): void {
    if (this.checkingCode)  
      this.activePanelIndex = 1;
  }
}
