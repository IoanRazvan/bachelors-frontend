import { NgModule } from '@angular/core';
import { ContributeProblemComponent } from './contribute-problem.component';
import { ContributeProblemHomeComponent } from './components/contribute-problem-home/contribute-problem-home.component';
import { ContributeProblemQuestionComponent } from './components/contribute-problem-question/contribute-problem-question.component';
import { StepsModule } from 'primeng/steps';
import { EditorModule } from 'primeng/editor';
import { ContributeProblemRoutingModule } from './contribute-problem-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ContributeProblemFormService } from './services/contribute-problem-form.service';


@NgModule({
  declarations: [
    ContributeProblemComponent,
    ContributeProblemHomeComponent,
    ContributeProblemQuestionComponent,
  ],
  imports: [
    SharedModule,
    ContributeProblemRoutingModule,
    StepsModule,
    EditorModule,
  ],
  providers: [
    ContributeProblemFormService
  ]
})
export class ContributeProblemModule {
}
