import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuardService } from "../core/services/auth-guard.service";
import { DevGuardService } from "../core/services/dev-guard.service";
import { AssignedContributionsComponent } from "./components/assigned-contributions/assigned-contributions.component";
import { UnassignedContributionsComponent } from "./components/unassigned-contributions/unassigned-contributions.component";
import { UnassignedContributionComponent } from "./components/unassigned-contribution/unassigned-contribution.component";
import { AssignedContributionComponent } from "./components/assigned-contribution/assigned-contribution.component";
import { AcceptContributionFormComponent } from "./components/accept-contribution-form/accept-contribution-form.component";
import { RejectContributionFormComponent } from "./components/reject-contribution-form/reject-contribution-form.component";

export const manageContributionsRoutes : Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'unassigned'},
    {path: 'unassigned', component: UnassignedContributionsComponent, canActivate: [AuthGuardService, DevGuardService]},
    {path: 'assigned', pathMatch: 'full', component: AssignedContributionsComponent},
    {path: 'unassigned/:id', pathMatch: 'full', component: UnassignedContributionComponent, canActivate: [AuthGuardService, DevGuardService]},
    {path: 'assigned/:id', pathMatch: 'full', component: AssignedContributionComponent, canActivate: [AuthGuardService, DevGuardService]},
    {path: 'assigned/:id/accept', pathMatch: 'full', component: AcceptContributionFormComponent, canActivate: [AuthGuardService, DevGuardService]},
    {path: 'assigned/:id/reject', pathMatch: 'full', component: RejectContributionFormComponent, canActivate: [AuthGuardService, DevGuardService]}
];

@NgModule({
    imports: [RouterModule.forChild(manageContributionsRoutes)],
    exports: [RouterModule]
})
export class ManageContributionsRoutingModule {
}