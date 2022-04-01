import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuardService } from "../core/services/auth-guard.service";
import { ContributeProblemHomeComponent } from "./components/contribute-problem-home/contribute-problem-home.component";
import { ContributeProblemQuestionComponent } from "./components/contribute-problem-question/contribute-problem-question.component";

export const contributeProblemRoutes: Routes = [
    {path: '', pathMatch: 'full', component: ContributeProblemHomeComponent, canActivate: [AuthGuardService]},
    {path: 'question', pathMatch: 'full', component: ContributeProblemQuestionComponent, canActivate: [AuthGuardService]},
];

@NgModule({
    imports: [RouterModule.forChild(contributeProblemRoutes)],
    exports: [RouterModule]
})
export class ContributeProblemRoutingModule {
}