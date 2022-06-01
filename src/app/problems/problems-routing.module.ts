import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuardService } from "../core/services/auth-guard.service";
import { ProblemsHomeComponent } from "./components/problems-home/problems-home.component";
import { SolveProblemComponent } from "./components/solve-problem/solve-problem.component";

export const problemsRoutes : Routes = [
    {path: '', pathMatch: 'full', component: ProblemsHomeComponent, canActivate: [AuthGuardService]},
    {path: ':id', pathMatch: 'full', component: SolveProblemComponent, canActivate: [AuthGuardService]}
]

@NgModule({
    imports: [
        RouterModule.forChild(problemsRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class ProblemsRoutingModule {
}