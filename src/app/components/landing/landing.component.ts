import { Component } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
})
export class LandingComponent {
  constructor(public keycloakService : KeycloakService) {
  }

  onSignIn() {
    this.keycloakService.login({
      redirectUri: environment.signInRedirectUri
    });
  }
}
