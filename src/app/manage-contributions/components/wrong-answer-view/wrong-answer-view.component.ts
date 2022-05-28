import { Component, Input } from '@angular/core';
import { CodeRunnerResult } from 'src/app/models/code-runner.model';

@Component({
  selector: 'app-wrong-answer-view',
  templateUrl: './wrong-answer-view.component.html',
})
export class WrongAnswerViewComponent {
  @Input() badResults!: CodeRunnerResult[];
  @Input() testcases!: any[];
  headers: string[] = ["Javascript", "C++", "Java"]
}
