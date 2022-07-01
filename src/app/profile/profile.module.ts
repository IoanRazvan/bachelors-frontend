import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { NgGitCalendarModule } from 'ng-git-calendar';
import { SharedModule } from '../shared/shared.module';
import { ProfileInformationComponent } from './components/profile-information/profile-information.component';
import {ProgressBarModule} from 'primeng/progressbar';
import { RouterModule } from '@angular/router';
import { SolvedProblemsStatsComponent } from './components/solved-problems-stats/solved-problems-stats.component';
import { ChartModule } from 'primeng/chart';

@NgModule({
  declarations: [
    ProfileComponent,
    ProfileInformationComponent,
    SolvedProblemsStatsComponent,
  ],
imports: [
    CommonModule,
    NgGitCalendarModule,
    SharedModule,
    ProgressBarModule,
    RouterModule,
    ChartModule
  ]
})
export class ProfileModule { }
