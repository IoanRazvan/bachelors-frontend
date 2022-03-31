import { Component } from "@angular/core";
import { NavItem } from "./models/nav-item.model";

@Component({
    selector: 'app-autorized',
    templateUrl: './authorized.component.html'
})
export class AuthorizedComponent {
    navItems: NavItem[] = [{
        path: '/home',
        name: 'Home'
    },
    {
        path: '/problems',
        name: 'Problems'
    }];
}