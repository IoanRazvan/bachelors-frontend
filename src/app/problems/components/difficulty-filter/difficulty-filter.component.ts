import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { LanguageService } from 'src/app/base/language.base';
import { ProblemDifficulty, PROBLEM_DIFFICULTIES } from 'src/app/models/category.model';

@Component({
  selector: 'app-difficulty-filter',
  templateUrl: './difficulty-filter.component.html',
})
export class DifficultyFilterComponent  {
  @Output() onChange: EventEmitter<any>;
  @Input() control!: AbstractControl;
  difficulties: ProblemDifficulty[];
  dictionary: any;
  
  constructor(languageService: LanguageService) {
    this.difficulties = PROBLEM_DIFFICULTIES;
    this.onChange = new EventEmitter();
    this.dictionary = languageService.dictionary;
  }
}
