import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ManageContributionsRoutingModule } from './manage-contributions-routing.module';
import { ManageContributionsComponent } from './manage-contributions.component';
import { UnassignedContributionsComponent } from './components/unassigned-contributions/unassigned-contributions.component';
import { SharedModule } from '../shared/shared.module';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { ToastModule } from 'primeng/toast';
import { UnassignedContributionComponent } from './components/unassigned-contribution/unassigned-contribution.component';
import { ToastMessageService } from '../shared/services/toast-message.service';
import { DividerModule } from 'primeng/divider';
import { AssignedContributionsComponent } from './components/assigned-contributions/assigned-contributions.component';
import { AssignedContributionComponent } from './components/assigned-contribution/assigned-contribution.component';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { CodeStepComponent } from './components/code-step/code-step.component';
import { DropdownModule } from 'primeng/dropdown';
import { AngularSplitModule } from 'angular-split';
import { AcceptContributionFormComponent } from './components/accept-contribution-form/accept-contribution-form.component';
import { StepsModule } from 'primeng/steps';
import { TabViewModule } from 'primeng/tabview';
import { RejectContributionFormComponent } from './components/reject-contribution-form/reject-contribution-form.component';
import { InputTextModule } from 'primeng/inputtext';
import { ChartModule } from 'primeng/chart';
import { ContributionsComponent } from './components/contributions/contributions.component';
import { ContributionsContentDirective } from './directives/contributions-content.directive';



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
