import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { CenteredComponent } from './components/centered/centered.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { LoadingPageComponent } from './components/loading-page/loading-page.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { ContributionViewComponent } from './components/contribution-view/contribution-view.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
  
    PaginatorComponent,
    CenteredComponent,
    ErrorPageComponent,
    LoadingPageComponent,
    ContributionViewComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PaginatorComponent,
    CenteredComponent,
    ErrorPageComponent,
    LoadingPageComponent,
    ContributionViewComponent
  ]
})
export class SharedModule { }
