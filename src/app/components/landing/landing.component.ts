import { Component } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { LanguageService } from 'src/app/core/services/language.service';
import { environment } from 'src/environments/environment';

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
      redirectUri: environment.signInRedirectUri
    });
  }
}
