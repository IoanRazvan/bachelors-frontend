import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContributeProblemComponent } from './contribute-problem.component';
import { RouterModule, Routes } from '@angular/router';
import { ContributeProblemHomeComponent } from './components/contribute-problem-home/contribute-problem-home.component';
import { AuthGuardService } from '../core/services/auth-guard.service';

export const contributeProblemRoutes: Routes = [
  {path: '', component: ContributeProblemHomeComponent, canActivate: [AuthGuardService]}
]

@NgModule({
  declarations: [
    ContributeProblemComponent,
    ContributeProblemHomeComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(contributeProblemRoutes)
  ],
  exports: [
    ContributeProblemComponent
  ]
})
export class ContributeProblemModule { }
