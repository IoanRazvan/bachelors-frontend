import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuardService } from "../core/services/auth-guard.service";
import { DevGuardService } from "../core/services/dev-guard.service";
import { ManageContributionsHomeComponent } from "./components/manage-contributions-home/manage-contributions-home.component";
import { SubmittedContributionComponent } from "./components/submitted-contribution/submitted-contribution.component";

export const manageContributionsRoutes : Routes = [
    {path: '', pathMatch: 'full', component: ManageContributionsHomeComponent, canActivate: [AuthGuardService, DevGuardService]},
    {path: ':id', pathMatch: 'full', component: SubmittedContributionComponent, canActivate: [AuthGuardService, DevGuardService]}
];

@NgModule({
    imports: [RouterModule.forChild(manageContributionsRoutes)],
    exports: [RouterModule]
})
export class ManageContributionsRoutingModule {
}