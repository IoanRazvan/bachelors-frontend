import { Component } from "@angular/core";
import { NavItem } from "./models/nav-item.model";

@Component({
    selector: 'app-autorized',
    templateUrl: './authorized.component.html'
})
export class AuthorizedComponent {
    navItems: NavItem[] = [{
        type: 'link',
        path: '/home',
        name: 'Home'
    },
    {
        type: 'link',
        path: '/problems',
        name: 'Problems'
    },
    {
        type: 'dropdown',
        path: [{
            path: '/contribute-problem',
            name: 'Problem'
        }],
        name: 'Contribute'
    }];
}