import { Component, Input } from '@angular/core';
import { LanguageService } from 'src/app/base/language.base';

@Component({
  selector: 'app-problem-details-tabview',
  templateUrl: './problem-details-tabview.component.html',
})
export class ProblemDetailsTabviewComponent {
  @Input() formData: any;
  dictionary: any;

  constructor(languageService: LanguageService) {
    this.dictionary = languageService.dictionary;
  }
}
