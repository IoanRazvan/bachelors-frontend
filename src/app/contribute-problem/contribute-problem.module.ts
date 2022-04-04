import { NgModule } from '@angular/core';
import { ContributeProblemComponent } from './contribute-problem.component';
import { ContributeProblemHomeComponent } from './components/contribute-problem-home/contribute-problem-home.component';
import { ContributeProblemQuestionComponent } from './components/contribute-problem-question/contribute-problem-question.component';
import { StepsModule } from 'primeng/steps';
import { EditorModule } from 'primeng/editor';
import { ContributeProblemRoutingModule } from './contribute-problem-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormStepLayoutComponent } from './components/form-step-layout/form-step-layout.component';
import { ContributeProblemFormComponent } from './components/contribute-problem-form/contribute-problem-form.component';
import { ContributeProblemConfirmComponent } from './components/contribute-problem-confirm/contribute-problem-confirm.component';
import { ContributeProblemSimpleStepComponent } from './components/contribute-problem-simple-step/contribute-problem-simple-step.component';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [
    ContributeProblemComponent,
    ContributeProblemHomeComponent,
    ContributeProblemQuestionComponent,
    FormStepLayoutComponent,
    ContributeProblemFormComponent,
    ContributeProblemConfirmComponent,
    ContributeProblemSimpleStepComponent
  ],
  imports: [
    SharedModule,
    ContributeProblemRoutingModule,
    StepsModule,
    EditorModule,
    ToastModule
  ]
})
export class ContributeProblemModule {
}
