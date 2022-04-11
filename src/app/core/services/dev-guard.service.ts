import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { KeycloakAuthGuard, KeycloakService } from "keycloak-angular";
import { UserRole } from "src/app/models/user.model";

@Injectable({
    providedIn: 'root'
})
export class DevGuardService extends KeycloakAuthGuard {
    constructor(router: Router, service: KeycloakService) {
        super(router, service);
    }

    isAccessAllowed(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Promise<boolean | UrlTree> {
        if (this.roles.includes(UserRole.DEVELOPER))
            return Promise.resolve(true);
        return Promise.resolve(false);
    }
}