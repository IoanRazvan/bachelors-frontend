import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuardService } from "../core/services/auth-guard.service";
import { ListDetailsComponent } from "./components/list-details/list-details.component";

export const listRoutes: Routes = [
    { path: ':id', pathMatch: 'full', component: ListDetailsComponent, canActivate: [AuthGuardService] },
];

@NgModule({
    imports: [RouterModule.forChild(listRoutes)],
    exports: [RouterModule]
})
export class ListRoutingModule {
}