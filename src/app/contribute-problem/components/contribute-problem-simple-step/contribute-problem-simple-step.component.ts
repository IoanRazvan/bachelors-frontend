import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { LanguageService } from 'src/app/core/services/language.service';
import { FormStepBase } from '../../base/form-step.base';

export interface StepData {
  stepTitle: string;
  stepLabel: string;
  stepErrorMessage: string;
  inputName: string;
}

@Component({
  selector: 'app-contribute-problem-simple-step',
  templateUrl: './contribute-problem-simple-step.component.html',
})
export class ContributeProblemSimpleStepComponent extends FormStepBase implements OnChanges {
  @Input() stepData!: StepData;
  input!: FormControl;
  @Input() override formData: any;
  @Output() override onNextStep = new EventEmitter<any>();
  @Output() override onPrevStep = new EventEmitter<any>();

  constructor(private formBuilder : FormBuilder, languageService: LanguageService) {
    super(languageService);
  }

  ngOnChanges(): void {
    if (!this.form) {
      const formGroupData : any = {};
      formGroupData[this.stepData.inputName] = ['', Validators.required];
      this.form = this.formBuilder.group(formGroupData);
    }   
    this.setForm();   
  }

  protected setForm(): void {
    const newFormValue: any = {};
    newFormValue[this.stepData.inputName] = this.formData[this.stepData.inputName];
    this.form.setValue(newFormValue);
    this.input = <FormControl>this.form.controls[this.stepData.inputName];
  }
}
