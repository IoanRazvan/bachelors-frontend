import { Component, Input } from '@angular/core';
import { ProblemRow } from 'src/app/models/problem.model';

@Component({
  selector: 'app-problems-table',
  templateUrl: './problems-table.component.html',
})
export class ProblemsTableComponent {
  @Input() problems!: ProblemRow[];
}
