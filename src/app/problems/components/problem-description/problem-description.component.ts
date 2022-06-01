import { Component, Input } from '@angular/core';
import { ProblemReponse } from 'src/app/models/problem.model';

@Component({
  selector: 'app-problem-description',
  templateUrl: './problem-description.component.html',
})
export class ProblemDescriptionComponent {
  @Input() problem!: ProblemReponse;
}
