import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { CenteredComponent } from './components/centered/centered.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { LoadingPageComponent } from './components/loading-page/loading-page.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { ContributionViewComponent } from './components/contribution-view/contribution-view.component';
import { RouterModule } from '@angular/router';
import { ContributeProblemQuestionComponent } from './components/contribute-problem-question/contribute-problem-question.component';
import { FormStepLayoutComponent } from './components/form-step-layout/form-step-layout.component';
import { EditorModule } from 'primeng/editor';
import { ContributionsTableComponent } from './components/contributions-table/contributions-table.component';
import { TableModule } from 'primeng/table';


@NgModule({
  declarations: [
  
    PaginatorComponent,
    CenteredComponent,
    ErrorPageComponent,
    LoadingPageComponent,
    ContributionViewComponent,
    ContributeProblemQuestionComponent,
    FormStepLayoutComponent,
    ContributionsTableComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    RouterModule,
    EditorModule,
    TableModule
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
    ContributionsTableComponent
  ]
})
export class SharedModule { }
