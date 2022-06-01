import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { distinctUntilChanged, skip } from 'rxjs';
import { FormStepBase } from 'src/app/base/form-step.base';
import { LanguageService } from 'src/app/base/language.base';
import { CodeRunnerService } from 'src/app/core/services/code-runner.service';
import { ProgrammingLanguageService } from 'src/app/core/services/programming-language.service';
import { CodeRunnerResult } from 'src/app/models/code-runner.model';
import { DropdownOption } from 'src/app/models/dropdown-option.model';
import { StepType } from 'src/app/models/step.type';
import { codeZonePresentValidator } from './code-step.validator';

@Component({
  selector: 'app-code-step',
  templateUrl: './code-step.component.html',
})
export class CodeStepComponent extends FormStepBase implements OnChanges {
  @Input() override formData!: any;
  @Output() override onStep: any;
  editor: any;
  override form: FormGroup;
  checkingCode: boolean;
  runnerResult!: CodeRunnerResult;
  loading: boolean;
  dropdownOptions!: DropdownOption<string, string>[];

  constructor(languageService: LanguageService, private fb: FormBuilder, private runnerService: CodeRunnerService, private apiService: ProgrammingLanguageService) {
    super(languageService);
    this.form = fb.group({
      input: [''],
      output: [''],
    });
    this.onStep = new EventEmitter();
    this.checkingCode = false;
    this.loading = true;
  }

  get ranWithNoErrors() {
    return this.form.controls['ranWithNoErrors'] as FormGroup;
  }

  ngOnChanges(): void {
    this.setForm();
  }

  protected setForm(): void {
    if (!this.formData.codeStep) {
      this.apiService.getAll().subscribe(languages => {
        this.loading = false;
        let dynamicValues : any = {languages};
        dynamicValues.selectedLanguage = languages[0].id;
        dynamicValues.ranWithNoErrors = {}
        this.setFormHelper(dynamicValues)
      });
    } else {
      this.loading = false;
      this.form.setValue({
        input: this.formData.codeStep.input,
        output: this.formData.codeStep.output,
      });
      this.setFormHelper(this.formData.codeStep)
    }
  }

  private setFormHelper(dynamicValues : any) {
    let ranWithNoErrorsObject: any = {};
    this.dropdownOptions = dynamicValues.languages.map((lang : any)=> ({label: lang.languageName, value: lang.id}))
    this.form.addControl('languages', new FormControl(dynamicValues.languages));
    this.form.addControl('selectedLanguage', new FormControl(dynamicValues.selectedLanguage));
    for (let language of dynamicValues.languages) {
      this.form.addControl(language.id, new FormControl(dynamicValues[language.id] || '', codeZonePresentValidator));
      this.form.controls[language.id].valueChanges.pipe(distinctUntilChanged((val1, val2) => {return val1 === val2;}), skip(1)).subscribe(() => {
        this.chageRanWithNoErrors(language.id, false);
      });
      ranWithNoErrorsObject[language.id] = [dynamicValues.ranWithNoErrors[language.id] || false, Validators.requiredTrue];
    }
    this.form.addControl('ranWithNoErrors', this.fb.group(ranWithNoErrorsObject));
  }

  submitCodeForCheck() {
    const formValue = this.form.value;
    this.checkingCode = true;
    this.runnerService.checkProgram(formValue[formValue.selectedLanguage], formValue.selectedLanguage, [formValue.input]).subscribe((res: CodeRunnerResult) => {
      this.checkingCode = false;
      this.runnerResult = res;
      if (this.runnerResult.status === 0)
        this.chageRanWithNoErrors(formValue.selectedLanguage, true);
    })
  }

  private chageRanWithNoErrors(language: string, value: boolean) {
    this.ranWithNoErrors.controls[language].setValue(value);
  }

  onEditorInit(editor: any) {
    this.editor = editor;
  }

  onResizeEnd() {
    this.editor?.layout();
  }

  override onStepClick(stepType: StepType): void {
    this.onStep.emit({ stepType, data: { codeStep: this.form.value } })
  }
}
