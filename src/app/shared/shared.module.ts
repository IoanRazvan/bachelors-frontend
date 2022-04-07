import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CenteredComponent } from './components/centered/centered.component';
import { PaginatorComponent } from './components/paginator/paginator.component';



@NgModule({
  declarations: [
  
    PaginatorComponent,
       CenteredComponent
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
    PaginatorComponent,
    CenteredComponent
  ]
})
export class SharedModule { }
