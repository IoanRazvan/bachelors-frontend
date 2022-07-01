import { Component, OnInit } from '@angular/core';
import Keycloak from 'keycloak-js';
import { IdentityService } from 'src/app/core/services/identity.service';

@Component({
  selector: 'app-profile-information',
  templateUrl: './profile-information.component.html',
})
export class ProfileInformationComponent implements OnInit {
  userInformation!: Keycloak.KeycloakProfile;
  loading: boolean;

  constructor(private identityService: IdentityService) {
    this.loading = true;
  }

  ngOnInit(): void {
    this.identityService.getUserInformation().then((value) => {
      this.userInformation = value;
      this.loading = false;
    })
  }

}
