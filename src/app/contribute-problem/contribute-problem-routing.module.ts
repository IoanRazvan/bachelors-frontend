import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuardService } from "../core/services/auth-guard.service";
import { ContributeProblemFormComponent } from "./components/contribute-problem-form/contribute-problem-form.component";
import { ContributeProblemHomeComponent } from "./components/contribute-problem-home/contribute-problem-home.component";
import { ContributionViewComponent } from "./components/contribution-view/contribution-view.component";

export const contributeProblemRoutes: Routes = [
    {path: '', pathMatch: 'full', component: ContributeProblemHomeComponent, canActivate: [AuthGuardService]},
    {path: 'form', pathMatch: 'full', component: ContributeProblemFormComponent, canActivate: [AuthGuardService]},
    {path: ':id', pathMatch: 'full', component: ContributionViewComponent, canActivate: [AuthGuardService]},
    {path: 'form/:id', pathMatch: 'full', component: ContributeProblemFormComponent, canActivate: [AuthGuardService]}
];

@NgModule({
    imports: [RouterModule.forChild(contributeProblemRoutes)],
    exports: [RouterModule]
})
export class ContributeProblemRoutingModule {
}