import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { LanguageService } from 'src/app/core/base/language.base';
import { ContributeProblemFormData } from '../contribute-problem-form/contribute-problem-form.component';

@Component({
  selector: 'app-contribute-problem-confirm',
  templateUrl: './contribute-problem-confirm.component.html',
  styleUrls: ['contribute-problem-confirm.style.css'],
  encapsulation: ViewEncapsulation.None
})
export class ContributeProblemConfirmComponent {
  @Input() formData!: ContributeProblemFormData;
  @Output() onPrevStep = new EventEmitter<any>();
  dictionary: any;

  constructor(languageService: LanguageService) {
    this.dictionary = languageService.dictionary;
  }
}
