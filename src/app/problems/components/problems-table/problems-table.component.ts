import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageInfo } from 'src/app/models/page-info.model';
import { ProblemRow } from 'src/app/models/problem.model';

@Component({
  selector: 'app-problems-table',
  templateUrl: './problems-table.component.html',
})
export class ProblemsTableComponent {
  @Input() problems!: ProblemRow[];
  @Input() pageInfo!: PageInfo;
  @Output() pageChange!: EventEmitter<number>;

  constructor() {
    this.pageChange = new EventEmitter();
  }
}
