import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { filter, Observable } from 'rxjs';
import { LanguageService } from 'src/app/base/language.base';
import { ProblemContributionService } from 'src/app/core/services/problem-contribution.service';
import { ProblemContributionRequest, ProblemContributionResponse } from 'src/app/models/problem-contribution.model';
import { StepData } from 'src/app/models/step-data.model';
import { ToastMessageService } from 'src/app/shared/services/toast-message.service';

@Component({
  selector: 'app-contribute-problem-form',
  templateUrl: './contribute-problem-form.component.html'
})
export class ContributeProblemFormComponent implements OnInit {
  items: MenuItem[];
  id?: string;
  errorStatus: number = 0;
  loading: boolean = false;
  tabIndex = 0;
  formData: ProblemContributionRequest;
  solutionStepData: StepData;
  testStepData: StepData;
  submitting = false;
  submissionHappend = false;
  dictionary: any;

  constructor(languageService: LanguageService, private apiService: ProblemContributionService, private messageService: ToastMessageService, private route: ActivatedRoute) {
    this.dictionary = languageService.dictionary;

    this.items = this.dictionary.contributeProblemStep.map((item: string, idx: number) => ({
      label: item,
      tabIndex: String(idx)
    }));

    this.formData = {
      title: '',
      description: '',
      solution: '',
      testcase: ''
    };

    this.solutionStepData = {
      stepTitle: this.dictionary.contributeProblemSolutionTitle,
      stepTip: this.dictionary.contributeProblemSolutionTip,
      inputName: 'solution',
      stepErrorMessage: this.dictionary.contributeProblemSolutionInputError,
      stepLabel: this.dictionary.contributeProblemSolutionInputTitle
    };

    this.testStepData = {
      stepTitle: this.dictionary.contributeProblemTestcaseTitle,
      stepTip: this.dictionary.contributeProblemTestcaseTip,
      inputName: 'testcase',
      stepErrorMessage: this.dictionary.contributeProblemTestcaseInputError,
      stepLabel: this.dictionary.contributeProblemTestcaseInputTitle
    };
  }

  ngOnInit(): void {
    this.route.params.pipe(filter(({ id }) => id)).subscribe(({ id }) => {
      this.loading = true;
      this.id = id;
      this.apiService.getContribution(id).subscribe({
        next: (resp) => {
          this.formData = resp;
          this.loading = false;
        },
        error: (err) => {
          this.errorStatus = err.status || 1;
          this.loading = false;
        }
      });
    });
  }

  onStep(event: any, tab: number) {
    if (event.stepType === "NEXT")
      this.tabIndex = tab + 1;
    else
      this.tabIndex = tab - 1;
    this.formData = Object.assign({}, this.formData, event.data);
  }

  submit() {
    if (this.id)
      this.updateContribution();
    else
      this.addContribution();
  }

  addContribution() {
    this.handleSubmission(this.apiService.save(this.formData), this.dictionary.contributeProblemToastSuccessDetail, this.dictionary.contributeProblemToastErrorDetail);
  }

  updateContribution() {
    this.handleSubmission(this.apiService.update(<any>this.id, this.formData), this.dictionary.updateContributionToastSuccessDetail, this.dictionary.updateContributionToastErrorDetail);
  }

  handleSubmission(submitObs: Observable<ProblemContributionResponse>, onSuccessDetail: string, onErrorDetail: string) {
    this.submitting = true;
    submitObs.subscribe({
      next: () => {
        this.messageService.addSuccess(onSuccessDetail);
        this.submissionHappend = true;
        this.submitting = false;
      },
      error: () => {
        this.messageService.addError(onErrorDetail);
        this.submitting = false;
      }
    });
  }
}
