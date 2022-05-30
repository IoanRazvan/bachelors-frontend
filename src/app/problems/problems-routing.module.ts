import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

export const problemsRoutes : Routes = []

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