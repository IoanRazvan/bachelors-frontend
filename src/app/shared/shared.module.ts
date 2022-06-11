import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { InputTextModule } from 'primeng/inputtext';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { CenteredComponent } from './components/centered/centered.component';
import { ContributeProblemQuestionComponent } from './components/contribute-problem-question/contribute-problem-question.component';
import { ContributionViewComponent } from './components/contribution-view/contribution-view.component';
import { ContributionsTableComponent } from './components/contributions-table/contributions-table.component';
import { DisplayRunnerResultComponent } from './components/display-runner-result/display-runner-result.component';
import { EditorAreaComponent } from './components/editor-area/editor-area.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { FormStepLayoutComponent } from './components/form-step-layout/form-step-layout.component';
import { LiveSearchComponent } from './components/live-search/live-search.component';
import { LoadingPageComponent } from './components/loading-page/loading-page.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { RunnerResultWindowComponent } from './components/runner-result-window/runner-result-window.component';
import { TemplateDirective } from './directives/template.directive';
import { DifficultyDetailsPipe } from './pipes/difficulty-details.pipe';
import { ProblemStatusDetailsPipe } from './pipes/problem-status-details.pipe';
import { StatusCodeDetailsPipe } from './pipes/status-code-details.pipe';


@NgModule({
  declarations: [

    PaginatorComponent,
    CenteredComponent,
    ErrorPageComponent,
    LoadingPageComponent,
    ContributionViewComponent,
    ContributeProblemQuestionComponent,
    FormStepLayoutComponent,
    ContributionsTableComponent,
    TemplateDirective,
    EditorAreaComponent,
    StatusCodeDetailsPipe,
    RunnerResultWindowComponent,
    DisplayRunnerResultComponent,
    DifficultyDetailsPipe,
    ProblemStatusDetailsPipe,
    LiveSearchComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    RouterModule,
    EditorModule,
    TableModule,
    DropdownModule,
    MonacoEditorModule,
    SkeletonModule,
    InputTextModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PaginatorComponent,
    CenteredComponent,
    ErrorPageComponent,
    LoadingPageComponent,
    ContributionViewComponent,
    ContributeProblemQuestionComponent,
    FormStepLayoutComponent,
    ContributionsTableComponent,
    TemplateDirective,
    EditorAreaComponent,
    StatusCodeDetailsPipe,
    RunnerResultWindowComponent,
    DisplayRunnerResultComponent,
    DifficultyDetailsPipe,
    ProblemStatusDetailsPipe,
    LiveSearchComponent
  ]
})
export class SharedModule { }
