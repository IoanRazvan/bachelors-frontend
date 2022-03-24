import { Component } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
})
export class LandingComponent {
  constructor(public keycloakService : KeycloakService) {
  }

  onSignIn() {
    this.keycloakService.login({
      redirectUri: 'http://localhost:4200/home'
    });
  }
}
