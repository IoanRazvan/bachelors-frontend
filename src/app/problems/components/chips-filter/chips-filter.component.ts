import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PROBLEM_DIFFICULTIES } from 'src/app/models/category.model';
import { PROBLEM_STATUSES } from 'src/app/models/problem.model';
import { DifficultyDetailsPipe } from 'src/app/shared/pipes/difficulty-details.pipe';
import { ProblemStatusDetailsPipe } from 'src/app/shared/pipes/problem-status-details.pipe';

@Component({
  selector: 'app-chips-filter',
  templateUrl: './chips-filter.component.html',
})
export class ChipsFilterComponent {
  @Input() chips!: string[];
  @Output() onRemove: EventEmitter<any>;

  constructor(private statusDetails: ProblemStatusDetailsPipe, private difficultyDetails: DifficultyDetailsPipe) {
    this.onRemove = new EventEmitter();
  }

  getChipValue(value: string) {
    if (PROBLEM_DIFFICULTIES.indexOf(<any>value) !== -1)
      return this.difficultyDetails.transform(<any>value, 'text');
    if (PROBLEM_STATUSES.indexOf(<any>value) !== -1)
      return this.statusDetails.transform(<any>value, 'text');
    return value;
  }

  onChange() {
    return false;
  }
}
