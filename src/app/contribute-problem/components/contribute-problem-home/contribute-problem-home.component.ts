import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from 'src/app/core/services/language.service';

@Component({
  selector: 'app-contribute-problem-home',
  templateUrl: './contribute-problem-home.component.html',
})
export class ContributeProblemHomeComponent {
  dictionary: any;

  constructor(private router: Router, languageService: LanguageService) {
    this.dictionary = languageService.dictionary;
  }

  onContribute() {
    this.router.navigate(['/contribute-problem/question']);
  }
}
