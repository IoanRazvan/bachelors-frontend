import { Component } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { LanguageService } from 'src/app/core/base/language.base';
import { ProblemContributionService } from 'src/app/core/services/problem-contribution.service';
import { ProblemContributionRequest } from 'src/app/models/problem-contribution.model';
import { StepData } from '../contribute-problem-simple-step/contribute-problem-simple-step.component';

@Component({
  selector: 'app-contribute-problem-form',
  templateUrl: './contribute-problem-form.component.html',
  providers: [MessageService]
})
export class ContributeProblemFormComponent {
  items: MenuItem[];
  tabIndex = 0;
  formData: ProblemContributionRequest = {
    title: '',
    description: '',
    solution: '',
    testcase: ''
  };
  solutionStepData : StepData;
  testStepData : StepData;
  submitting = false;
  submissionHappend = false;
  dictionary: any;

  constructor(languageService: LanguageService, private apiService: ProblemContributionService, private messageService: MessageService) {
    this.dictionary = languageService.dictionary;
    this.items = this.dictionary.contributeProblemStep.map((item : string, idx : number) => ({
      label: item,
      tabIndex: String(idx)
    }));
    
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

  onStep(event : any, tab : number) {
    if (event.stepType === "NEXT")
      this.tabIndex = tab + 1;
    else
      this.tabIndex = tab - 1;
    this.formData = Object.assign({}, this.formData, event.data);
  }

  submit() {
    this.submitting = true;
    this.apiService.save(this.formData).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success', summary: this.dictionary.toastSuccessSummary, detail: this.dictionary.contributeProblemToastSuccesDetail
        });
        this.submissionHappend = true;
        this.submitting = false;
      },
      error: () => {
        this.messageService.add({
          severity: 'error', summary: this.dictionary.toastErrorSummary, detail: this.dictionary.contributeProblemToastErrorDetail
        });
        this.submitting = false;
      }
    });
  }
}
