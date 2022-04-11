import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { contributeProblemRoutes } from "../contribute-problem/contribute-problem-routing.module";
import { ContributeProblemComponent } from "../contribute-problem/contribute-problem.component";
import { AuthGuardService } from "../core/services/auth-guard.service";
import { HomeComponent } from "../home/home.component";
import { manageContributionsRoutes } from "../manage-contributions/manage-contributions-routing.module";
import { ManageContributionsComponent } from "../manage-contributions/manage-contributions.component";

export const authorizedRoutes: Routes = [
    {path: 'home', pathMatch: 'full', component: HomeComponent, canActivate: [AuthGuardService]},
    {path: 'contribute-problem', component: ContributeProblemComponent, children: contributeProblemRoutes},
    {path: 'manage-contributions', component: ManageContributionsComponent, children: manageContributionsRoutes}
];

@NgModule({
    imports: [RouterModule.forChild(authorizedRoutes)],
    exports: [RouterModule]
})
export class AuthorizedRoutingModule {
}