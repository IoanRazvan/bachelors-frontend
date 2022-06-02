import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ProblemDifficulty } from 'src/app/models/category.model';

@Component({
  selector: 'app-difficulty-filter',
  templateUrl: './difficulty-filter.component.html',
})
export class DifficultyFilterComponent  {
  @Output() onChange: EventEmitter<any>;
  @Input() control!: AbstractControl;
  difficulties: ProblemDifficulty[];
  
  constructor() {
    this.difficulties = ['EASY', 'MEDIUM', 'HARD'];
    this.onChange = new EventEmitter();
  }
}
