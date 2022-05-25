import { Component } from "@angular/core";
import { LanguageService } from "../base/language.base";
import { IdentityService } from "../core/services/identity.service";
import { NavItem } from "../models/nav-item.model";

@Component({
    selector: 'app-authorized',
    templateUrl: './authorized.component.html'
})
export class AuthorizedComponent {
    navItems: NavItem[];
    
    constructor(languageService: LanguageService, indentityService: IdentityService) {
        const dictionary = languageService.dictionary;
        this.navItems = [{
            type: 'link',
            path: '/home',
            name: <string>dictionary.navbarOption[0]
        },
        {
            type: 'link',
            path: '/problems',
            name: <string>dictionary.navbarOption[1]
        },
        {
            type: 'link',
            path: '/contribute-problem',
            name: dictionary.navbarOption[2]
        }];
        if (indentityService.hasDeveloperRole()) {
            this.navItems.push({
                type: 'dropdown',
                path: [
                    {path: '/manage-contributions', name: dictionary.navbarOption[3][1]},
                    {path: '/manage-contributions/assigned', name: dictionary.navbarOption[3][2]}
                ],
                name: <string>dictionary.navbarOption[3][0]
            })
        }
    }
}