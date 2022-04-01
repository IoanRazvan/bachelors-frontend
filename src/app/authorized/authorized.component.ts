import { Component } from "@angular/core";
import { LanguageService } from "../core/services/language.service";
import { NavItem } from "./models/nav-item.model";

@Component({
    selector: 'app-authorized',
    templateUrl: './authorized.component.html'
})
export class AuthorizedComponent {
    navItems: NavItem[];
    
    constructor(languageService: LanguageService) {
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
            type: 'dropdown',
            path: [{
                path: '/contribute-problem',
                name: dictionary.navbarOption[2][1]
            }],
            name: dictionary.navbarOption[2][0]
        }];
    }
}