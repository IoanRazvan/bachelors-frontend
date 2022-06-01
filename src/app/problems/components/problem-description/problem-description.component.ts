import { Component, Input } from '@angular/core';
import { LanguageService } from 'src/app/base/language.base';
import { ProblemReponse } from 'src/app/models/problem.model';

@Component({
  selector: 'app-problem-description',
  templateUrl: './problem-description.component.html',
})
export class ProblemDescriptionComponent {
  @Input() problem!: ProblemReponse;
  dictionary: any;

  constructor(languageService: LanguageService) {
    this.dictionary = languageService.dictionary
  }
}
