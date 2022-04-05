import { Component } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { LanguageService } from 'src/app/core/base/language.base';
import { ProblemContributionService } from 'src/app/core/services/problem-contribution.service';
import { StepData } from '../contribute-problem-simple-step/contribute-problem-simple-step.component';

export interface ContributeProblemFormData {
  title: string;
  description: string;
  solution: string;
  testcase: string;
}

@Component({
  selector: 'app-contribute-problem-form',
  templateUrl: './contribute-problem-form.component.html',
  providers: [MessageService]
})
export class ContributeProblemFormComponent {
  items: MenuItem[];
  tabIndex = 0;
  formData: ContributeProblemFormData = {
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
      inputName: 'solution',
      stepErrorMessage: this.dictionary.contributeProblemSolutionInputError,
      stepLabel: this.dictionary.contributeProblemSolutionInputTitle
    };

    this.testStepData = {
      stepTitle: this.dictionary.contributeProblemTestcaseTitle,
      inputName: 'testcase',
      stepErrorMessage: this.dictionary.contributeProblemTestcaseInputError,
      stepLabel: this.dictionary.contributeProblemTestcaseInputTitle
    };
  }

  onStep(event : any, nextTab : number) {
    this.formData = Object.assign({}, this.formData, event);
    this.tabIndex = nextTab;
  }

  submit() {
    this.submitting = true;
    this.apiService.save(this.formData).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success', summary: this.dictionary.toastSuccessSummary, detail: this.dictionary.contributeProblemToastSuccesDetail
        });
        this.submissionHappend = true;
        this.submitCleanup();
      },
      error: () => {
        this.messageService.add({
          severity: 'error', summary: this.dictionary.toastErrorSummary, detail: this.dictionary.contributeProblemToastErrorDetail
        });
        this.submitCleanup();
      }
    });
  }

  private submitCleanup() {
    // setTimeout(() => this.messageService.clear(), 2000);
    this.submitting = false;
  }
}
