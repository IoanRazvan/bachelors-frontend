import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ManageContributionsRoutingModule } from './manage-contributions-routing.module';
import { ManageContributionsComponent } from './manage-contributions.component';



@NgModule({
  declarations: [
    ManageContributionsComponent
  ],
  imports: [
    CommonModule,
    ManageContributionsRoutingModule
  ]
})
export class ManageContributionsModule { }
