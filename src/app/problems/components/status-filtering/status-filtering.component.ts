import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ProblemStatus } from 'src/app/models/problem.model';

@Component({
  selector: 'app-status-filtering',
  templateUrl: './status-filtering.component.html',
})
export class StatusFilteringComponent {
  @Input() control!: FormControl;
  @Output() onChange: EventEmitter<any>;
  status: ProblemStatus[];

  constructor() {
    this.status  = ['Todo', 'Attempted', 'Solved'];
    this.onChange = new EventEmitter();
  }
}
