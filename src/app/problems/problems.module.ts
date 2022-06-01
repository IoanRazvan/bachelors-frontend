import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProblemsRoutingModule } from './problems-routing.module';
import { ProblemsComponent } from './problems.component';
import { ProblemsHomeComponent } from './components/problems-home/problems-home.component';
import { ChipsModule } from 'primeng/chips';
import { SharedModule } from '../shared/shared.module';
import { DropdownModule } from 'primeng/dropdown';
import { ProblemsTableComponent } from './components/problems-table/problems-table.component';
import { TableModule } from 'primeng/table';
import { SolveProblemComponent } from './components/solve-problem/solve-problem.component';
import { AngularSplitModule } from 'angular-split';
import { TabViewModule } from 'primeng/tabview';
import { AccordionModule } from 'primeng/accordion';
import { SubmissionsTableComponent } from './components/submissions-table/submissions-table.component';
import { ProblemDescriptionComponent } from './components/problem-description/problem-description.component';
import { SkeletonModule } from 'primeng/skeleton';
import { DividerModule } from 'primeng/divider';
import { ProblemDetailsAreaComponent } from './components/problem-details-area/problem-details-area.component';


@NgModule({
  declarations: [
    ProblemsComponent,
    ProblemsHomeComponent,
    ProblemsTableComponent,
    SolveProblemComponent,
    SubmissionsTableComponent,
    ProblemDescriptionComponent,
    ProblemDetailsAreaComponent
  ],
  imports: [
    CommonModule,
    ProblemsRoutingModule,
    ChipsModule,
    SharedModule,
    DropdownModule,
    TableModule,
    AngularSplitModule,
    TabViewModule,
    AccordionModule,
    SkeletonModule,
    DividerModule
  ]
})
export class ProblemsModule { }
