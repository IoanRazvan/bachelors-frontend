import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginatorComponent } from './components/paginator/paginator.component';



@NgModule({
  declarations: [
  
    PaginatorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PaginatorComponent
  ]
})
export class SharedModule { }
