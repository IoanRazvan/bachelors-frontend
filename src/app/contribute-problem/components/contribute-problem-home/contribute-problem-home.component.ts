import { Component } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { LanguageService } from 'src/app/core/base/language.base';

@Component({
  selector: 'app-contribute-problem-home',
  templateUrl: './contribute-problem-home.component.html',
})
export class ContributeProblemHomeComponent {
  dictionary: any;

  constructor(languageService: LanguageService, keycloakService: KeycloakService) {
    this.dictionary = languageService.dictionary;
    keycloakService.getToken().then((tok) => console.log(tok));
  }
}
