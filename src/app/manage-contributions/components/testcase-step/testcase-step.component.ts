import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, skip, Subject } from 'rxjs';
import { FormStepBase } from 'src/app/base/form-step.base';
import { LanguageService } from 'src/app/base/language.base';
import { CodeRunnerService } from 'src/app/core/services/code-runner.service';
import { CodeDetails, CodeRunnerResult } from 'src/app/models/code-runner.model';
import { StepData } from 'src/app/models/step-data.model';
import { ToastMessageService } from 'src/app/shared/services/toast-message.service';

@Component({
  selector: 'app-testcase-step',
  templateUrl: './testcase-step.component.html',
  styleUrls: ['./testcase-step.component.css']
})
export class TestcaseStepComponent extends FormStepBase implements OnChanges, OnInit {
  override form: FormGroup;
  @Input() override formData!: any;
  @Output() override onStep: EventEmitter<StepData>;
  checkingCode: boolean;
  badResults!: CodeRunnerResult[];

  get testcases() {
    return this.form.controls['testcases'] as FormArray;
  }

  get passed() {
    return this.form.controls['passed'] as FormControl;
  }

  constructor(languageService: LanguageService, private fb: FormBuilder, private service: CodeRunnerService, private messageService: ToastMessageService) {
    super(languageService);
    this.checkingCode = false;
    this.onStep = new EventEmitter();
    this.form = fb.group({
      testcases: fb.array([
        fb.group({
          input: ['', Validators.required],
          output: ['', Validators.required]
        })
      ]),
      passed: [false, Validators.requiredTrue]
    });
  }

  ngOnInit(): void {
      this.testcases.valueChanges.pipe(skip(1)).subscribe(() => {
        this.passed.setValue(false);
      })
  }

  ngOnChanges(): void {
    this.setForm();
  }

  protected setForm(): void {
    if (this.formData.testcases) {
      this.form.setValue({
        testcases: [this.formData.testcases[0]],
        passed: this.formData.passed || false
      });
      for (let testcase of this.formData.testcases.slice(1))
        this.testcases.push(this.createNewTestcase(testcase.input, testcase.output))
    } else {
      this.form.setValue({
        testcases: [{ input: '', output: '' }],
        passed: this.formData || false
      });
    }
  }

  private createNewTestcase(input: string, output: string) : FormGroup {
    return this.fb.group({
      input: [input, Validators.required],
      output: [output, Validators.required]
    })
  }

  onAddTestClick() {
    this.testcases.push(this.createNewTestcase('', ''));
  }

  onTrashClick(idx: number) {
    this.testcases.removeAt(idx, {emitEvent: false});
  }

  onCheck() {
    let details: CodeDetails[] = [];
    const languages = ["javascript", "cpp", "java"];
    const input = this.testcases.value.map((testcase : any) => testcase.input);
    const output = this.testcases.value.map((testcase : any) => testcase.output);
    for (let [idx, language] of languages.entries()) {
      details.push({
        code: this.formData[language],
        langId: idx + 1,
        input,
        output
      });
    }
    this.checkingCode = true;
    
    this.service.checkSolutionsAgainsTestcases(details).subscribe(results => {
      this.checkingCode = false;
      this.badResults = results.filter(result => result.status !== 0);
      if (this.badResults.length === 0) {
        this.messageService.addSuccess("Toate cazurile de test au trecut cu succes");
        this.passed.setValue(true);
      }
    });
  }
}
