import { Component, Input } from '@angular/core';
import { CodeRunnerResult } from 'src/app/models/code-runner.model';
import { ProgrammingLanguage } from 'src/app/models/programming-language.model';

@Component({
  selector: 'app-wrong-answer-view',
  templateUrl: './wrong-answer-view.component.html',
})
export class WrongAnswerViewComponent {
  @Input() badResults!: CodeRunnerResult[];
  @Input() testcases!: any[];
  @Input() languages!: ProgrammingLanguage[];

  get headers() {
    const headers : any = {};
    this.languages.forEach(lang => headers[lang.id] = lang.languageName);
    return headers;
  }
}
