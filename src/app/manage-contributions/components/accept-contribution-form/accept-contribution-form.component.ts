import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { LanguageService } from 'src/app/base/language.base';
import { ManageContributionsService } from 'src/app/core/services/manage-contributions.service';
import { ProblemContributionService } from 'src/app/core/services/problem-contribution.service';
import { Problem } from 'src/app/models/problem.model';
import { ToastMessageService } from 'src/app/shared/services/toast-message.service';

@Component({
  selector: 'app-accept-contribution-form',
  templateUrl: './accept-contribution-form.component.html',
})
export class AcceptContributionFormComponent implements OnInit {
  items: MenuItem[];
  tabIndex: number;
  loading: boolean;
  form: any;
  submitted: boolean;
  id!: string;
  dictionary: any;

  constructor(private route: ActivatedRoute, private contributionService: ProblemContributionService, languageService: LanguageService, private toastMessage: ToastMessageService, private contributionsManagement: ManageContributionsService) {
    this.dictionary = languageService.dictionary
    this.items = [{ label: this.dictionary.problem, tabindex: '0' }, { label: this.dictionary.implementation, tabindex: '1' }, { label: this.dictionary.tests, tabindex: '2' }, { label: this.dictionary.additional, tabindex: '3' }];
    this.tabIndex = 0;
    this.loading = true;
    this.submitted = false;
    this.form = {};

  }

  ngOnInit(): void {
    this.route.params.subscribe(({ id }) => {
      this.id = id;
      this.contributionService.getContribution(id).subscribe((resp) => {
        this.form = {
          ...resp
        }
        this.loading = false;
      });
    })
  }

  onStep(event: any, step: number) {
    if (event.stepType === "NEXT")
      this.tabIndex = step + 1;
    else
      this.tabIndex = step - 1;
    this.form = {
      ...this.form,
      ...event.data
    }
  }

  onSubmitClick(data: any) {
    this.form = {
      ...this.form,
      ...data,
    };
    const solutions = Object.getOwnPropertyNames(this.form.codeStep).filter(prop => ['selectedLanguage', 'languages', 'input', 'output', 'ranWithNoErrors'].indexOf(prop) === -1).map(prop => ({ languageId: prop, sourceCode: this.form.codeStep[prop] }));
    
    const problem: Problem = {
      title: this.form.title,
      description: this.form.description,
      testcases: this.form.testcases,
      categories: this.form.selectedCategories,
      difficulty: this.form.difficulty,
      solutions
    };

    this.contributionsManagement.acceptContribution(this.id, problem).subscribe(() => {
      this.toastMessage.addSuccess(this.dictionary.problemAddedSuccessfully);
      this.submitted = true
    });
  }
}
