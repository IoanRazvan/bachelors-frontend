import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from 'src/app/core/base/language.base';

@Component({
  selector: 'app-contribute-problem-home',
  templateUrl: './contribute-problem-home.component.html',
})
export class ContributeProblemHomeComponent {
  dictionary: any;

  constructor(languageService: LanguageService) {
    this.dictionary = languageService.dictionary;
  }
}
