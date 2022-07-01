import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ListboxModule } from 'primeng/listbox';
import { ToastModule } from 'primeng/toast';
import { SharedModule } from '../shared/shared.module';
import { ListDetailsComponent } from './components/list-details/list-details.component';
import { ListRoutingModule } from './list-routing.module';
import { ListComponent } from './list.component';



@NgModule({
  declarations: [
    ListComponent,
    ListDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ListboxModule,
    ConfirmDialogModule,
    DialogModule,
    ListRoutingModule,
    InputTextModule,
    ToastModule
  ]
})
export class ListModule { }
