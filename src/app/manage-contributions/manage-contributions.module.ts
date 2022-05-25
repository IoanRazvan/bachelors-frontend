import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularSplitModule } from 'angular-split';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { ChartModule } from 'primeng/chart';
import { CheckboxModule } from 'primeng/checkbox';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { StepsModule } from 'primeng/steps';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { ToastMessageService } from '../shared/services/toast-message.service';
import { SharedModule } from '../shared/shared.module';
import { AcceptContributionFormComponent } from './components/accept-contribution-form/accept-contribution-form.component';
import { AssignedContributionComponent } from './components/assigned-contribution/assigned-contribution.component';
import { AssignedContributionsComponent } from './components/assigned-contributions/assigned-contributions.component';
import { CodeStepComponent } from './components/code-step/code-step.component';
import { ContributionsComponent } from './components/contributions/contributions.component';
import { RejectContributionFormComponent } from './components/reject-contribution-form/reject-contribution-form.component';
import { UnassignedContributionComponent } from './components/unassigned-contribution/unassigned-contribution.component';
import { UnassignedContributionsComponent } from './components/unassigned-contributions/unassigned-contributions.component';
import { ContributionsContentDirective } from './directives/contributions-content.directive';
import { ManageContributionsRoutingModule } from './manage-contributions-routing.module';
import { ManageContributionsComponent } from './manage-contributions.component';



@NgModule({
  declarations: [
    ManageContributionsComponent,
    UnassignedContributionsComponent,
    UnassignedContributionComponent,
    AssignedContributionsComponent,
    AssignedContributionComponent,
    CodeStepComponent,
    AcceptContributionFormComponent,
    RejectContributionFormComponent,
    ContributionsComponent,
    ContributionsContentDirective
  ],
  imports: [
    CommonModule,
    ManageContributionsRoutingModule,
    SharedModule,
    TableModule,
    CheckboxModule,
    ToastModule,
    DividerModule,
    MonacoEditorModule,
    DropdownModule,
    AngularSplitModule,
    StepsModule,
    TabViewModule,
    InputTextModule,
    ChartModule
  ],
  providers: [
    ToastMessageService
  ]
})
export class ManageContributionsModule { }
