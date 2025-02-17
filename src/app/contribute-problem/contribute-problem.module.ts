import { NgModule } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { StepsModule } from 'primeng/steps';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToastMessageService } from '../shared/services/toast-message.service';
import { SharedModule } from '../shared/shared.module';
import { ContributeProblemConfirmComponent } from './components/contribute-problem-confirm/contribute-problem-confirm.component';
import { ContributeProblemFormComponent } from './components/contribute-problem-form/contribute-problem-form.component';
import { ContributeProblemHomeComponent } from './components/contribute-problem-home/contribute-problem-home.component';
import { ContributeProblemSimpleStepComponent } from './components/contribute-problem-simple-step/contribute-problem-simple-step.component';
import { PersonalContributionViewComponent } from './components/personal-contribution-view/personal-contribution-view.component';
import { ContributeProblemRoutingModule } from './contribute-problem-routing.module';
import { ContributeProblemComponent } from './contribute-problem.component';

@NgModule({
  declarations: [
    ContributeProblemComponent,
    ContributeProblemHomeComponent,
    ContributeProblemFormComponent,
    ContributeProblemConfirmComponent,
    ContributeProblemSimpleStepComponent,
    PersonalContributionViewComponent
  ],
  imports: [
    SharedModule,
    ContributeProblemRoutingModule,
    StepsModule,
    ToastModule,
    TableModule,
    ConfirmPopupModule
  ],
  providers: [
    ConfirmationService,
    ToastMessageService
  ]
})
export class ContributeProblemModule {
}
