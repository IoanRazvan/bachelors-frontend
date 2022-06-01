import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CodeRunnerService } from 'src/app/core/services/code-runner.service';
import { ProblemService } from 'src/app/core/services/problem.service';
import { SubmissionService } from 'src/app/core/services/submission.service';
import { CodeRunnerResult } from 'src/app/models/code-runner.model';
import { DropdownOption } from 'src/app/models/dropdown-option.model';
import { ProblemReponse } from 'src/app/models/problem.model';
import { SubmissionRow } from 'src/app/models/submission.model';

@Component({
  selector: 'app-solve-problem',
  templateUrl: './solve-problem.component.html',
})
export class SolveProblemComponent implements OnInit {
  problem!: ProblemReponse;
  loading: boolean;
  dropdownOptions!: DropdownOption<string, string>[];
  form!: FormGroup;
  editor!: any;
  checkingCode: boolean;
  submissions!: SubmissionRow[];
  runnerResult!: CodeRunnerResult;

  constructor(private route: ActivatedRoute, private service: ProblemService, private fb: FormBuilder, private codeRunnerService: CodeRunnerService, private submissionService: SubmissionService) {
    this.loading = true;
    this.checkingCode = false;
  }

  ngOnInit(): void {
    this.route.params.subscribe(({ id }) => {
      this.service.getProblem(id).subscribe((resp) => {
        this.problem = resp;
        this.dropdownOptions = this.problem.starters.map(starter => ({ label: starter.languageName, value: starter.languageId }));
        const formGroup: any = {};
        this.problem.starters.forEach((starter) => {
          formGroup[starter.languageId] = [starter.sourceCode];
        });
        formGroup['selectedLanguage'] = this.dropdownOptions[0].value;
        this.form = this.fb.group(formGroup);
      });

      this.submissionService.getSubmissions(id).subscribe((resp) => {
        this.loading = false;
        this.submissions = resp;
      });
    })
  }

  onEditorInit(editor: any) {
    this.editor = editor;
  }

  onResizeEnd() {
    this.editor?.layout();
  }

  onCodeCheck() {
    this.checkingCode = true;
    let formValue = this.form.value;
    let selectedLanguage = formValue.selectedLanguage;
    this.codeRunnerService.submitSolution(this.problem.id, { languageId: selectedLanguage, sourceCode: formValue[selectedLanguage] }).subscribe((resp) => {
      this.checkingCode = false;
      this.runnerResult = resp.codeRunnerResult;
      this.submissions = [resp.submission].concat(this.submissions);
    })
  }
}
