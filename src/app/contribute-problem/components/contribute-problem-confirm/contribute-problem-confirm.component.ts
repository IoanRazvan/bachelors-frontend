import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { LanguageService } from 'src/app/core/base/language.base';
import { ProblemContributionRequest } from 'src/app/models/problem-contribution.model';

@Component({
  selector: 'app-contribute-problem-confirm',
  templateUrl: './contribute-problem-confirm.component.html',
  styleUrls: ['contribute-problem-confirm.style.css'],
  encapsulation: ViewEncapsulation.None
})
export class ContributeProblemConfirmComponent {
  @Input() formData!: ProblemContributionRequest;
  @Input() submitting: boolean = false;
  @Input() submissionHappend: boolean = false;
  @Output() onPrevStep = new EventEmitter<any>();
  @Output() onSubmit = new EventEmitter<any>();
  dictionary: any;

  constructor(languageService: LanguageService) {
    this.dictionary = languageService.dictionary;
  }
}
