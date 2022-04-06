import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LanguageService } from 'src/app/core/base/language.base';
import { FormStepBase } from '../../base/form-step.base';

@Component({
  selector: 'app-contribute-problem-question',
  templateUrl: './contribute-problem-question.component.html',
})
export class ContributeProblemQuestionComponent extends FormStepBase implements OnChanges {
  title!: FormControl;
  description!: FormControl;
  @Input() override formData: any;
  @Output() override onStep = new EventEmitter<any>();
  override form: FormGroup;
  
  constructor(formBuilder: FormBuilder, languageService: LanguageService) {
    super(languageService);
    this.form = formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  }
  
  ngOnChanges(): void {
    this.setForm();
  }
  
  protected setForm() {
    this.form.setValue({
      title: this.formData.title,
      description: this.formData.description
    });
    this.title = <FormControl>this.form.controls['title'];
    this.description = <FormControl>this.form.controls['description'];
  }
}
