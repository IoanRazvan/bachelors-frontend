import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuardService } from "../core/services/auth-guard.service";
import { DevGuardService } from "../core/services/dev-guard.service";
import { ManageContributionsComponent } from "./manage-contributions.component";

export const manageContributionsRoutes : Routes = [
    {path: '', pathMatch: 'full', component: ManageContributionsComponent, canActivate: [AuthGuardService, DevGuardService]}
];

@NgModule({
    imports: [RouterModule.forChild(manageContributionsRoutes)],
    exports: [RouterModule]
})
export class ManageContributionsRoutingModule {
}