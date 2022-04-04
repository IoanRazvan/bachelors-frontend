import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LanguageService } from 'src/app/core/base/language.base';

@Component({
  selector: 'app-form-step-layout',
  templateUrl: './form-step-layout.component.html',
})
export class FormStepLayoutComponent  {
  @Input() stepTitle !: string;
  @Input() formGroup !: FormGroup;
  @Input() showPrevStepButton : boolean = true;
  @Output() onNextStep = new EventEmitter<any>();
  @Output() onPrevStep = new EventEmitter<any>(); 
  dictionary: any;

  constructor(languageService: LanguageService) {
    this.dictionary = languageService.dictionary;
  }
}
