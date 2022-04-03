import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LanguageService } from 'src/app/core/services/language.service';
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

  constructor(languageService: LanguageService) {
    const dictionary = languageService.dictionary;
    this.items = dictionary.contributeProblemStep.map((item : string, idx : number) => ({
      label: item,
      tabIndex: String(idx)
    }));
    
    this.solutionStepData = {
      stepTitle: dictionary.contributeProblemSolutionTitle,
      inputName: 'solution',
      stepErrorMessage: dictionary.contributeProblemSolutionInputError,
      stepLabel: dictionary.contributeProblemSolutionInputTitle
    };

    this.testStepData = {
      stepTitle: dictionary.contributeProblemTestcaseTitle,
      inputName: 'testcase',
      stepErrorMessage: dictionary.contributeProblemTestcaseInputError,
      stepLabel: dictionary.contributeProblemTestcaseInputTitle
    };
  }

  onStep(event : any, nextTab : number) {
    this.formData = Object.assign({}, this.formData, event);
    this.tabIndex = nextTab;
  }
}
