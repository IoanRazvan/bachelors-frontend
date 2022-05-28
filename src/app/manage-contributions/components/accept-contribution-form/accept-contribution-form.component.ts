import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { LanguageService } from 'src/app/base/language.base';
import { ProblemContributionService } from 'src/app/core/services/problem-contribution.service';

@Component({
  selector: 'app-accept-contribution-form',
  templateUrl: './accept-contribution-form.component.html',
})
export class AcceptContributionFormComponent implements OnInit {
  items: MenuItem[];
  tabIndex: number;
  loading: boolean;
  form: any;

  constructor(private route: ActivatedRoute, private service: ProblemContributionService, languageService: LanguageService) {
    this.items = [{label: languageService.dictionary.problem, tabindex: '0'}, {label: languageService.dictionary.implementation, tabindex: '1'}, {label: 'Teste', tabindex: '2'}];
    this.tabIndex = 0;
    this.loading = true;
    this.form = {};
    
  }

  ngOnInit(): void {
    this.route.params.subscribe(({id}) => {
      this.service.getContribution(id).subscribe((resp) => {
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

}
