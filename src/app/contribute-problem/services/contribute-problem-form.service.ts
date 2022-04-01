import { Injectable } from '@angular/core';

export interface ProblemContribution {
  title: string;
  description: string;
  solution: string;
  testcase: string;
}

@Injectable()
export class ContributeProblemFormService {
  problemContributionData: ProblemContribution = {
    title: "",
    description: "",
    solution: "",
    testcase: ""
  }

  reset() {
    this.problemContributionData = {
      title: "",
      description: "",
      solution: "",
      testcase: ""
    };
  }

  setTitleAndDescription(title: string, description: string) {
    this.problemContributionData.title = title;
    this.problemContributionData.description = description;
  }

  getTitle() : string {
    return this.problemContributionData.title;
  }

  getDescription() : string {
    return this.problemContributionData.description;
  }
}
