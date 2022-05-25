import { Location } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LanguageService } from 'src/app/base/language.base';
import { ProblemContributionRequest } from 'src/app/models/problem-contribution.model';

@Component({
  selector: 'app-contribute-problem-confirm',
  templateUrl: './contribute-problem-confirm.component.html',
})
export class ContributeProblemConfirmComponent {
  @Input() formData!: ProblemContributionRequest;
  @Input() submitting: boolean = false;
  @Input() submissionHappend: boolean = false;
  @Input() submitButtonText!: string;
  @Output() onPrevStep = new EventEmitter<any>();
  @Output() onSubmit = new EventEmitter<any>();
  dictionary: any;

  constructor(languageService: LanguageService, private location: Location) {
    this.dictionary = languageService.dictionary;
  }

  goBack() {
    this.location.back();
  }
}
