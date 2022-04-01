import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { contributeProblemRoutes } from "../contribute-problem/contribute-problem-routing.module";
import { ContributeProblemComponent } from "../contribute-problem/contribute-problem.component";
import { AuthGuardService } from "../core/services/auth-guard.service";
import { HomeComponent } from "../home/home.component";

export const authorizedRoutes: Routes = [
    {path: 'home', pathMatch: 'full', component: HomeComponent, canActivate: [AuthGuardService]},
    {path: 'contribute-problem', component: ContributeProblemComponent, children: contributeProblemRoutes}
];

@NgModule({
    imports: [RouterModule.forChild(authorizedRoutes)],
    exports: [RouterModule]
})
export class AuthorizedRoutingModule {
}