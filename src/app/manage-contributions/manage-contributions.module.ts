import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ManageContributionsRoutingModule } from './manage-contributions-routing.module';
import { ManageContributionsComponent } from './manage-contributions.component';
import { ManageContributionsHomeComponent } from './components/manage-contributions-home/manage-contributions-home.component';
import { SharedModule } from '../shared/shared.module';
import { TableModule } from 'primeng/table';
import {CheckboxModule} from 'primeng/checkbox';
import { ToastModule } from 'primeng/toast';
import { SubmittedContributionComponent } from './components/submitted-contribution/submitted-contribution.component';
import { ToastMessageService } from '../shared/services/toast-message.service';
import { DividerModule } from 'primeng/divider';



@NgModule({
  declarations: [
    ManageContributionsComponent,
    ManageContributionsHomeComponent,
    SubmittedContributionComponent
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
