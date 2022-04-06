import { Component } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { LanguageService } from 'src/app/core/base/language.base';
import { PageInfo } from 'src/app/models/page-info.model';
import { ProblemContribution } from 'src/app/models/problem-contribution.model';

@Component({
  selector: 'app-contribute-problem-home',
  templateUrl: './contribute-problem-home.component.html',
})
export class ContributeProblemHomeComponent {
  dictionary: any;
  previousContributions: ProblemContribution[] = [];
  pageInfo !: PageInfo;

  constructor(languageService: LanguageService, keycloakService: KeycloakService) {
    this.dictionary = languageService.dictionary;
    keycloakService.getToken().then((tok) => console.log(tok));
  }
}
