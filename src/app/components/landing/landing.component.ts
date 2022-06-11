import { Component } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { LanguageService } from 'src/app/base/language.base';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
})
export class LandingComponent {
  dictionary: any;

  constructor(public keycloakService : KeycloakService, language: LanguageService) {
    this.dictionary = language.dictionary;
  }

  onSignIn() {
    this.keycloakService.login({
      redirectUri: window.location.origin + '/problems'
    });
  }
}
