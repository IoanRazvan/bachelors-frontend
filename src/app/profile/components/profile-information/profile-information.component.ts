import { Component, OnInit } from '@angular/core';
import Keycloak from 'keycloak-js';
import { LanguageService } from 'src/app/base/language.base';
import { IdentityService } from 'src/app/core/services/identity.service';

@Component({
  selector: 'app-profile-information',
  templateUrl: './profile-information.component.html',
})
export class ProfileInformationComponent implements OnInit {
  userInformation!: Keycloak.KeycloakProfile;
  loading: boolean;
  dictionary: any;

  constructor(private identityService: IdentityService, languageService: LanguageService) {
    this.loading = true;
    this.dictionary = languageService.dictionary;
  }

  ngOnInit(): void {
    this.identityService.getUserInformation().then((value) => {
      this.userInformation = value;
      this.loading = false;
    })
  }

}
