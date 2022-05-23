import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuardService } from "../core/services/auth-guard.service";
import { DevGuardService } from "../core/services/dev-guard.service";
import { AssignedContributionsComponent } from "./components/assigned-contributions/assigned-contributions.component";
import { NewContributionsComponent } from "./components/new-contributions/new-contributions.component";
import { NewContributionComponent } from "./components/new-contribution/new-contribution.component";
import { AssignedContributionComponent } from "./components/assigned-contribution/assigned-contribution.component";
import { RefuseContributionFormComponent } from "./components/refuse-contribution-form/refuse-contribution-form.component";

export const manageContributionsRoutes : Routes = [
    {path: 'new', component: NewContributionsComponent, canActivate: [AuthGuardService, DevGuardService]},
    {path: '', pathMatch: 'full', redirectTo: 'new'},
    {path: 'assigned', pathMatch: 'full', component: AssignedContributionsComponent},
    {path: 'new/:id', pathMatch: 'full', component: NewContributionComponent, canActivate: [AuthGuardService, DevGuardService]},
    {path: 'assigned/:id', pathMatch: 'full', component: AssignedContributionComponent, canActivate: [AuthGuardService, DevGuardService]},
    {path: 'refuse/:id', pathMatch: 'full', component: RefuseContributionFormComponent, canActivate: [AuthGuardService, DevGuardService]}
];

@NgModule({
    imports: [RouterModule.forChild(manageContributionsRoutes)],
    exports: [RouterModule]
})
export class ManageContributionsRoutingModule {
}