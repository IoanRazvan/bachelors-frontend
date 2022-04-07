import { NgModule } from '@angular/core';
import { EditorModule } from 'primeng/editor';
import { StepsModule } from 'primeng/steps';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { SharedModule } from '../shared/shared.module';
import { ContributeProblemConfirmComponent } from './components/contribute-problem-confirm/contribute-problem-confirm.component';
import { ContributeProblemFormComponent } from './components/contribute-problem-form/contribute-problem-form.component';
import { ContributeProblemHomeComponent } from './components/contribute-problem-home/contribute-problem-home.component';
import { ContributeProblemQuestionComponent } from './components/contribute-problem-question/contribute-problem-question.component';
import { ContributeProblemSimpleStepComponent } from './components/contribute-problem-simple-step/contribute-problem-simple-step.component';
import { ContributionsTableComponent } from './components/contributions-table/contributions-table.component';
import { FormStepLayoutComponent } from './components/form-step-layout/form-step-layout.component';
import { ContributeProblemRoutingModule } from './contribute-problem-routing.module';
import { ContributeProblemComponent } from './contribute-problem.component';
import { ContributionViewComponent } from './components/contribution-view/contribution-view.component';

@NgModule({
  declarations: [
    ContributeProblemComponent,
    ContributeProblemHomeComponent,
    ContributeProblemQuestionComponent,
    FormStepLayoutComponent,
    ContributeProblemFormComponent,
    ContributeProblemConfirmComponent,
    ContributeProblemSimpleStepComponent,
    ContributionsTableComponent,
    ContributionViewComponent
  ],
  imports: [
    SharedModule,
    ContributeProblemRoutingModule,
    StepsModule,
    EditorModule,
    ToastModule,
    TableModule
  ]
})
export class ContributeProblemModule {
}
