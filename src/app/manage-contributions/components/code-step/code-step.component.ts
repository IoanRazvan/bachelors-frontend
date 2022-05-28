import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { skip } from 'rxjs';
import { FormStepBase } from 'src/app/base/form-step.base';
import { LanguageService } from 'src/app/base/language.base';
import { CodeRunnerService } from 'src/app/core/services/code-runner.service';
import { CodeRunnerResult } from 'src/app/models/code-runner.model';
import { StepType } from 'src/app/models/step.type';
import { codeRanWithNoErrorsValidator, codeZonePresentValidator } from './code-step.validator';

enum Errors {
  COMPILE_ERROR = 1,
  RUNTIME_ERROR = 2,
  TIME_LIMIT_EXCEDEED = 3,
  WRONG_ANSWER = 4
}

@Component({
  selector: 'app-code-step',
  templateUrl: './code-step.component.html',
})
export class CodeStepComponent extends FormStepBase implements OnChanges, OnInit {
  @Input() override formData!: any;
  @Output() override onStep: any;
  editor: any;
  override form: FormGroup;
  checkingCode: boolean;
  runnerResult!: CodeRunnerResult;
  ranCode: boolean;
  languageToId: any;

  constructor(languageService: LanguageService, fb: FormBuilder, private service: CodeRunnerService) {
    super(languageService);
    this.form = fb.group({
      javascript: ['', codeZonePresentValidator],
      cpp: ['', codeZonePresentValidator],
      java: ['', codeZonePresentValidator],
      selectedLanguage: ['javascript'],
      input: [''],
      output: [''],
      ran: [{javascript: false, cpp: false, java: false}, codeRanWithNoErrorsValidator],
    });
    this.languageToId = {javascript: 1, cpp: 2, java: 3};
    this.onStep = new EventEmitter();
    this.ranCode = false;
    this.checkingCode = false;
  }

  ngOnInit(): void {
    const languages = ['javascript', 'cpp', 'java'];
    for (let language of languages) {
      this.form.controls[language].valueChanges.pipe(skip(1)).subscribe(() => this.setRanControlValue(language, false));
    }
  }

  ngOnChanges(): void {
    this.setForm();
  }

  protected setForm(): void {
    console.log(this.formData.ran)
    this.form.setValue({
      javascript: this.formData.javascript || '',
      cpp: this.formData.cpp || '',
      java: this.formData.java || '',
      selectedLanguage: this.formData.selectedLanguage || 'javascript',
      input: this.formData.input || '',
      output: this.formData.output || '',
      ran: this.formData.ran || {javascript: false, cpp: false, java: false}
    });
  }

  submitCodeForCheck() {
    const formValue = this.form.value;
    let langId = this.languageToId[formValue.selectedLanguage];
    this.checkingCode = true;
    this.service.checkProgram(formValue[formValue.selectedLanguage], langId, [formValue.input]).subscribe((res : CodeRunnerResult) => {
      this.checkingCode = false;
      this.ranCode = true;
      this.runnerResult = res;
      if (this.runnerResult.status === 0)
        this.setRanControlValue(formValue.selectedLanguage, true);
    })
  }

  private setRanControlValue(language: string, value: boolean) {
    const ran = this.form.value.ran;
    ran[language] = value;
    this.form.controls['ran'].setValue(ran)
  }

  onEditorInit(editor: any) {
    this.editor = editor;
  }

  onResizeEnd() {
    this.editor?.layout();
  }

  override onStepClick(stepType: StepType): void {
      console.log(this.form.value.ran);
      super.onStepClick(stepType);
  }
}
