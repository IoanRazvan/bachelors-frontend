import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authorizedRoutes } from './authorized/authorized-routing.module';
import { AuthorizedComponent } from './authorized/authorized.component';
import { LandingComponent } from './components/landing/landing.component';
import { AuthGuardService } from './core/services/auth-guard.service';

const routes: Routes = [
  {path: '', component: LandingComponent, pathMatch: 'full', canActivate: [AuthGuardService]},
  {path: '', component: AuthorizedComponent, children: authorizedRoutes},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
