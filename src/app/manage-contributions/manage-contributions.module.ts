import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ManageContributionsRoutingModule } from './manage-contributions-routing.module';
import { ManageContributionsComponent } from './manage-contributions.component';
import { NewContributionsComponent } from './components/new-contributions/new-contributions.component';
import { SharedModule } from '../shared/shared.module';
import { TableModule } from 'primeng/table';
import {CheckboxModule} from 'primeng/checkbox';
import { ToastModule } from 'primeng/toast';
import { SubmittedContributionComponent } from './components/submitted-contribution/submitted-contribution.component';
import { ToastMessageService } from '../shared/services/toast-message.service';
import { DividerModule } from 'primeng/divider';
import { AssignedContributionsComponent } from './components/assigned-contributions/assigned-contributions.component';



@NgModule({
  declarations: [
    ManageContributionsComponent,
    NewContributionsComponent,
    SubmittedContributionComponent,
    AssignedContributionsComponent
  ],
  imports: [
    CommonModule,
    ManageContributionsRoutingModule,
    SharedModule,
    TableModule,
    CheckboxModule,
    ToastModule,
    DividerModule
  ],
  providers: [
    ToastMessageService
  ]
})
export class ManageContributionsModule { }
