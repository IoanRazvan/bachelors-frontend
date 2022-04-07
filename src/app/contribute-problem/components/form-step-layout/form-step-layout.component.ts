import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LanguageService } from 'src/app/core/base/language.base';
import { StepType } from 'src/app/models/step.type';

@Component({
  selector: 'app-form-step-layout',
  templateUrl: './form-step-layout.component.html',
  styleUrls: ['form-step-layout.component.scss']
})
export class FormStepLayoutComponent  {
  @Input() stepTitle !: string;
  @Input() formGroup !: FormGroup;
  @Input() showPrevStepButton : boolean = true;
  @Input() stepTip!: string;
  @Output() onStep = new EventEmitter<StepType>();
  dictionary: any;

  constructor(languageService: LanguageService) {
    this.dictionary = languageService.dictionary;
  }
}
