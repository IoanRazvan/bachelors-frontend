import { Component, Input } from '@angular/core';
import { UnassignedContributionRow } from 'src/app/models/problem-contribution.model';

@Component({
  selector: 'app-unassigned-contributions-table',
  templateUrl: './unassigned-contributions-table.component.html',
})
export class UnassignedContributionsTableComponent  {
  @Input() data!: UnassignedContributionRow[];
}
