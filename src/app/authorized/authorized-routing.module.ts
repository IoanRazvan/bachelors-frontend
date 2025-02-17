import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { contributeProblemRoutes } from "../contribute-problem/contribute-problem-routing.module";
import { ContributeProblemComponent } from "../contribute-problem/contribute-problem.component";
import { AuthGuardService } from "../core/services/auth-guard.service";
import { HomeComponent } from "../home/home.component";
import { listRoutes } from "../list/list-routing.module";
import { ListComponent } from "../list/list.component";
import { manageContributionsRoutes } from "../manage-contributions/manage-contributions-routing.module";
import { ManageContributionsComponent } from "../manage-contributions/manage-contributions.component";
import { problemsRoutes } from "../problems/problems-routing.module";
import { ProblemsComponent } from "../problems/problems.component";
import { ProfileComponent } from "../profile/profile.component";

export const authorizedRoutes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'problems'},
    {path: 'home', pathMatch: 'full', component: HomeComponent, canActivate: [AuthGuardService]},
    {path: 'contribute-problem', component: ContributeProblemComponent, children: contributeProblemRoutes, canActivate: [AuthGuardService]},
    {path: 'manage-contributions', component: ManageContributionsComponent, children: manageContributionsRoutes, canActivate: [AuthGuardService]},
    {path: 'problems', component: ProblemsComponent, children: problemsRoutes, canActivate: [AuthGuardService]},
    {path: 'lists', component: ListComponent, children: listRoutes, canActivate: [AuthGuardService]},
    {path: 'profile', component: ProfileComponent, pathMatch: 'full', canActivate: [AuthGuardService]}
];

@NgModule({
    imports: [RouterModule.forChild(authorizedRoutes)],
    exports: [RouterModule]
})
export class AuthorizedRoutingModule {
}