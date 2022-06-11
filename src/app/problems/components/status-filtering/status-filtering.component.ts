import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LanguageService } from 'src/app/base/language.base';
import { ProblemStatus, PROBLEM_STATUSES } from 'src/app/models/problem.model';

@Component({
  selector: 'app-status-filtering',
  templateUrl: './status-filtering.component.html',
})
export class StatusFilteringComponent {
  @Input() control!: FormControl;
  @Output() onChange: EventEmitter<any>;
  status: ProblemStatus[];
  dictionary: any;

  constructor(languageService: LanguageService) {
    this.status  = PROBLEM_STATUSES;
    this.onChange = new EventEmitter();
    this.dictionary = languageService.dictionary;
  }
}
