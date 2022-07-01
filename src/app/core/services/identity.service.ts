import { Injectable } from "@angular/core";
import { KeycloakService } from "keycloak-angular";
import Keycloak from "keycloak-js";
import { UserRole } from "src/app/models/user.model";

@Injectable({
    providedIn: 'root'
})
export class IdentityService {
    constructor(private keycloakService: KeycloakService) {
    }

    hasDeveloperRole() : boolean {
        return this.keycloakService.getUserRoles().includes(UserRole.DEVELOPER);
    }

    getUserInformation() : Promise<Keycloak.KeycloakProfile> {
        return this.keycloakService.loadUserProfile();
    }
}
