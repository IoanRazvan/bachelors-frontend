import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LanguageService } from 'src/app/base/language.base';
import { StepType } from 'src/app/models/step.type';

@Component({
  selector: 'app-form-step-layout',
  templateUrl: './form-step-layout.component.html'
})
export class FormStepLayoutComponent  {
  @Input() stepTitle !: string;
  @Input() formGroup !: FormGroup;
  @Input() showPrevStepButton : boolean = true;
  @Input() stepTip!: string;
  @Input() extend: boolean = false;
  @Output() onStep = new EventEmitter<StepType>();
  dictionary: any;

  constructor(languageService: LanguageService) {
    this.dictionary = languageService.dictionary;
  }
}
