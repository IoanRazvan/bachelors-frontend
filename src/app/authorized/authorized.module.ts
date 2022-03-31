import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { AuthGuardService } from '../core/services/auth-guard.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthorizedComponent } from './authorized.component';
import { HomeModule } from '../home/home.module';
import { ContributeProblemComponent } from '../contribute-problem/contribute-problem.component';
import { contributeProblemRoutes } from '../contribute-problem/contribute-problem.module';

export const authorizedRoutes: Routes = [
  {path: 'home', pathMatch: 'full', component: HomeComponent, canActivate: [AuthGuardService]},
  {path: 'contribute-problem', pathMatch: 'full', component: ContributeProblemComponent, children: contributeProblemRoutes}
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
