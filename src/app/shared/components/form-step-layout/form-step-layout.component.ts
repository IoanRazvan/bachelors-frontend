import { Component, ContentChildren, EventEmitter, Input, Output, QueryList } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LanguageService } from 'src/app/base/language.base';
import { StepType } from 'src/app/models/step.type';
import { TemplateDirective } from '../../directives/template.directive';

@Component({
  selector: 'app-form-step-layout',
  templateUrl: './form-step-layout.component.html'
})
export class FormStepLayoutComponent  {
  @Input() stepTitle !: string;
  @Input() formGroup !: FormGroup;
  @Input() showPrevStepButton : boolean = true;
  @Input() stepTip!: string;
  @Input() extend: boolean = false;
  @Output() onStep = new EventEmitter<StepType>();
  content!: TemplateDirective;
  nextButton?: TemplateDirective;
  dictionary: any;

  @ContentChildren(TemplateDirective)
  set templates(list: QueryList<TemplateDirective>) {
    this.nextButton = list.find(template => template.appTemplate === 'next');
    this.content = <any>list.find(template => template.appTemplate === 'content');
  }

  constructor(languageService: LanguageService) {
    this.dictionary = languageService.dictionary;
  }
}
