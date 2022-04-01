import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LanguageService } from 'src/app/core/services/language.service';
import { ContributeProblemFormService } from '../../services/contribute-problem-form.service';

@Component({
  selector: 'app-contribute-problem-details',
  templateUrl: './contribute-problem-question.component.html',
})
export class ContributeProblemQuestionComponent {
  form: FormGroup;
  title: FormControl;
  description: FormControl;
  dictionary: any;


  constructor(formBuilder: FormBuilder, private router: Router, private problemService: ContributeProblemFormService, languageService: LanguageService) {
    this.form = formBuilder.group({
      title: [problemService.getTitle(), Validators.required],
      description: [problemService.getDescription(), Validators.required]
    });
    this.title = <FormControl>this.form.controls['title'];
    this.description = <FormControl>this.form.controls['description'];
    this.dictionary = languageService.dictionary;
  }

  onNextStep() : boolean {
    this.problemService.setTitleAndDescription(this.title.value, this.description.value);
    this.router.navigate(['contribute-problem/solution']);
    return false;
  }
}
