import { NgModule } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthorizedComponent } from './authorized.component';
import { AuthorizedRoutingModule } from './authorized-routing.module';
import { SharedModule } from '../shared/shared.module';

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
