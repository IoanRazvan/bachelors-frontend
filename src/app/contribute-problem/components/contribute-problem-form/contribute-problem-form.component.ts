import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { filter, Observable } from 'rxjs';
import { LanguageService } from 'src/app/core/base/language.base';
import { ProblemContributionService } from 'src/app/core/services/problem-contribution.service';
import { ProblemContributionRequest, ProblemContributionResponse } from 'src/app/models/problem-contribution.model';
import { StepData } from '../contribute-problem-simple-step/contribute-problem-simple-step.component';

@Component({
  selector: 'app-contribute-problem-form',
  templateUrl: './contribute-problem-form.component.html'
})
export class ContributeProblemFormComponent implements OnInit {
  items: MenuItem[];
  id ?: string;
  tabIndex = 0;
  formData: ProblemContributionRequest;
  solutionStepData: StepData;
  testStepData: StepData;
  submitting = false;
  submissionHappend = false;
  dictionary: any;

  constructor(languageService: LanguageService, private apiService: ProblemContributionService, private messageService: MessageService, private route: ActivatedRoute) {
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
    this.route.params.pipe(filter(({id}) => id)).subscribe(({ id }) => {
        this.id = id;
        // TODO handle possible error/not found
        this.apiService.getContribution(id).subscribe((resp) => {
          this.formData = resp;
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
    this.handleSubmission(this.apiService.update(<any>this.id, this.formData), this.dictionary.contributeProblemToastSuccessDetail, this.dictionary.contributeProblemToastErrorDetail);
  }

  handleSubmission(submitObs: Observable<ProblemContributionResponse>, onSuccessDetail: string, onErrorDetail: string) {
    this.submitting = true;
    submitObs.subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success', summary: this.dictionary.toastSuccessSummary, detail: onSuccessDetail
        });
        this.submissionHappend = true;
        this.submitting = false;
      },
      error: () => {
        this.messageService.add({
          severity: 'error', summary: this.dictionary.errorSummary, detail: onErrorDetail
        });
        this.submitting = false;
      }
    });
  }
}
