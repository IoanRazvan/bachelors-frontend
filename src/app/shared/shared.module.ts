import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { EditorModule } from 'primeng/editor';
import { TableModule } from 'primeng/table';
import { CenteredComponent } from './components/centered/centered.component';
import { ContributeProblemQuestionComponent } from './components/contribute-problem-question/contribute-problem-question.component';
import { ContributionViewComponent } from './components/contribution-view/contribution-view.component';
import { ContributionsTableComponent } from './components/contributions-table/contributions-table.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { FormStepLayoutComponent } from './components/form-step-layout/form-step-layout.component';
import { LoadingPageComponent } from './components/loading-page/loading-page.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { TemplateDirective } from './directives/template.directive';


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
    ContributionsTableComponent,
    TemplateDirective
  ]
})
export class SharedModule { }
