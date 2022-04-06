import { Component, Input } from '@angular/core';
import { NavItem } from '../../../models/nav-item.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  @Input() navItems!: NavItem[];
}