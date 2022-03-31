import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { AuthGuardService } from '../core/services/auth-guard.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthorizedComponent } from './authorized.component';
import { HomeModule } from '../home/home.module';

export const authorizedRoutes: Routes = [
  {path: 'home', pathMatch: 'full', component: HomeComponent, canActivate: [AuthGuardService]},
]

@NgModule({
  declarations: [
    AuthorizedComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    HomeModule,
    RouterModule.forChild(authorizedRoutes)
  ],
  exports: [
    AuthorizedComponent,
  ]
})
export class AuthorizedModule { }
