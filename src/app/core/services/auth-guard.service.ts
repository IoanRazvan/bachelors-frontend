import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { KeycloakAuthGuard, KeycloakService } from "keycloak-angular";

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService extends KeycloakAuthGuard {
    constructor(protected override readonly router: Router, protected readonly keycloak: KeycloakService) {
        super(router, keycloak);
    }

    public async isAccessAllowed(_route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
        if (!this.authenticated && state.url !== '/') {
            await this.keycloak.login({
                redirectUri: window.location.origin + state.url
            });
        } else if (this.authenticated && state.url === '/') {
            return this.router.parseUrl('problems');
        }
        return true;
    }
}