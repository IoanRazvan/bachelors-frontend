import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularSplitModule } from 'angular-split';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { AccordionModule } from 'primeng/accordion';
import { ChartModule } from 'primeng/chart';
import { ChipsModule } from 'primeng/chips';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { ListboxModule } from 'primeng/listbox';
import { MultiSelectModule } from 'primeng/multiselect';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { SharedModule } from '../shared/shared.module';
import { CategoryFilteringComponent } from './components/category-filtering/category-filtering.component';
import { ChipsFilterComponent } from './components/chips-filter/chips-filter.component';
import { DifficultyFilterComponent } from './components/difficulty-filter/difficulty-filter.component';
import { ListAddDropdownComponent } from './components/list-add-dropdown/list-add-dropdown.component';
import { ProblemDescriptionComponent } from './components/problem-description/problem-description.component';
import { ProblemDetailsAreaComponent } from './components/problem-details-area/problem-details-area.component';
import { ProblemsHomeComponent } from './components/problems-home/problems-home.component';
import { ProblemsTableComponent } from './components/problems-table/problems-table.component';
import { SolveProblemComponent } from './components/solve-problem/solve-problem.component';
import { StatusFilteringComponent } from './components/status-filtering/status-filtering.component';
import { SubmissionDetailsComponent } from './components/submission-details/submission-details.component';
import { SubmissionsTableComponent } from './components/submissions-table/submissions-table.component';
import { ToggleableUserListFormComponent } from './components/toggleable-user-list-form/toggleable-user-list-form.component';
import { ProblemsRoutingModule } from './problems-routing.module';
import { ProblemsComponent } from './problems.component';


@NgModule({
  declarations: [
    ProblemsComponent,
    ProblemsHomeComponent,
    ProblemsTableComponent,
    SolveProblemComponent,
    SubmissionsTableComponent,
    ProblemDescriptionComponent,
    ProblemDetailsAreaComponent,
    DifficultyFilterComponent,
    StatusFilteringComponent,
    CategoryFilteringComponent,
    ListAddDropdownComponent,
    ToggleableUserListFormComponent,
    SubmissionDetailsComponent,
    ChipsFilterComponent
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
    DividerModule,
    MultiSelectModule,
    ListboxModule,
    OverlayPanelModule,
    ToastModule,
    MonacoEditorModule,
    ChartModule
  ]
})
export class ProblemsModule { }
