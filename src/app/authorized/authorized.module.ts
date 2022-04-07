import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AuthorizedRoutingModule } from './authorized-routing.module';
import { AuthorizedComponent } from './authorized.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [
    AuthorizedComponent,
    NavbarComponent,
  ],
  imports: [
    AuthorizedRoutingModule,
    SharedModule,
  ]
})
export class AuthorizedModule { }
