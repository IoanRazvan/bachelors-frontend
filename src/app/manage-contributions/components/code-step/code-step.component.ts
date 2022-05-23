import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormStepBase } from 'src/app/contribute-problem/base/form-step.base';
import { LanguageService } from 'src/app/core/base/language.base';
import { RunnerService } from 'src/app/core/services/runner.service';
import { RunnerResult } from 'src/app/models/runner-result.model';
import { codeZonePresentValidator } from './code-step.validator';

interface Language {
  name: string;
  id: string;
}

@Component({
  selector: 'app-code-step',
  templateUrl: './code-step.component.html',
})
export class CodeStepComponent extends FormStepBase implements OnChanges {
  options: Language[];
  editorOptions: any;
  editor: any;
  @Input() override formData!: any;
  @Output() override onStep: any;
  override form: FormGroup;
  stepTip: string;
  checkingCode: boolean = false;
  error: string = "";
  

  constructor(languageService: LanguageService, fb: FormBuilder, private service: RunnerService) {
    super(languageService);
    this.options = [
      { name: 'Javascript', id: 'javascript' },
      { name: 'C++', id: 'cpp' },
      { name: 'Java', id: 'java' }
    ];
    this.form = fb.group({
      javascript: ['', codeZonePresentValidator('// starter', '// solution')],
      cpp: ['', codeZonePresentValidator('// starter', '// solution')],
      java: ['', codeZonePresentValidator('// starter', '// solution')],
      selectedLanguage: ['javascript'],
      input: [''],
      output: ['']
    });
    this.editorOptions = { theme: 'vs-light', language: 'javascript', minimap: { enabled: false } };
    this.onStep = new EventEmitter();
    this.stepTip = `Codul de start si solutia trebuie sa fie inconjurate de comentarii <code>// starter</code> respectiv <code>// solution</code>. Exemplu:
    <pre>
    // starter
    int maxSorted(vector<int> & v) {
        // solution
        return v[v.size() - 1];
        // solution
    }
    // starter
  </pre>`;
  }

  ngOnChanges(): void {
    this.setForm();
    this.editorOptions = {
      ...this.editorOptions,
      language: this.formData.selectedLanguage || 'javascript'
    }
  }

  protected setForm(): void {
    this.form.setValue({
      javascript: this.formData.javascript || '',
      cpp: this.formData.cpp || '',
      java: this.formData.java || '',
      selectedLanguage: this.formData.selectedLanguage || 'javascript',
      input: this.formData.input || '',
      output: this.formData.output || ''
    });
  }

  onDropdownValueChange() {
    this.editorOptions = {
      ...this.editorOptions,
      language: this.form.value.selectedLanguage
    };
  }

  submitCodeForCheck() {
    const formValue = this.form.value;
    console.log(formValue);
    let langId;
    switch (formValue.selectedLanguage) {
      case "javascript":
        langId = 0;
        break;
      case "cpp":
        langId =  1;
        break;
      default:
        langId = 2;
        break; 
    }
    this.checkingCode = true;
    this.service.checkProgram(formValue[formValue.selectedLanguage], langId).subscribe((res : RunnerResult) => {
      this.checkingCode = false;
      this.error = res.details;  
    })
  }

  onEditorInit(editor: any) {
    this.editor = editor;
  }

  onResizeEnd() {
    this.editor?.layout();
  }
}
