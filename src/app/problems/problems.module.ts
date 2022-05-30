import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProblemsRoutingModule } from './problems-routing.module';
import { ProblemsComponent } from './problems.component';
import { ProblemsHomeComponent } from './components/problems-home/problems-home.component';



@NgModule({
  declarations: [
    ProblemsComponent,
    ProblemsHomeComponent
  ],
  imports: [
    CommonModule,
    ProblemsRoutingModule
  ]
})
export class ProblemsModule { }
