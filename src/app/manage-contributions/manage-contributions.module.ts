import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ManageContributionsRoutingModule } from './manage-contributions-routing.module';
import { ManageContributionsComponent } from './manage-contributions.component';
import { NewContributionsComponent } from './components/new-contributions/new-contributions.component';
import { SharedModule } from '../shared/shared.module';
import { TableModule } from 'primeng/table';
import {CheckboxModule} from 'primeng/checkbox';
import { ToastModule } from 'primeng/toast';
import { NewContributionComponent } from './components/new-contribution/new-contribution.component';
import { ToastMessageService } from '../shared/services/toast-message.service';
import { DividerModule } from 'primeng/divider';
import { AssignedContributionsComponent } from './components/assigned-contributions/assigned-contributions.component';
import { UnassignedContributionsTableComponent } from './components/unassigned-contributions-table/unassigned-contributions-table.component';
import { AssignedContributionComponent } from './components/assigned-contribution/assigned-contribution.component';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { CodeStepComponent } from './components/code-step/code-step.component';
import { DropdownModule } from 'primeng/dropdown';
import { AngularSplitModule } from 'angular-split';
import { AcceptContributionFormComponent } from './components/accept-contribution-form/accept-contribution-form.component';
import { StepsModule } from 'primeng/steps';
import {TabViewModule} from 'primeng/tabview';
import { RejectContributionFormComponent } from './components/reject-contribution-form/reject-contribution-form.component';



@NgModule({
  declarations: [
    ManageContributionsComponent,
    NewContributionsComponent,
    NewContributionComponent,
    AssignedContributionsComponent,
    UnassignedContributionsTableComponent,
    AssignedContributionComponent,
    CodeStepComponent,
    AcceptContributionFormComponent,
    RejectContributionFormComponent
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
    TabViewModule
  ],
  providers: [
    ToastMessageService
  ]
})
export class ManageContributionsModule { }
