import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LanguageService } from 'src/app/core/base/language.base';
import { ProblemContributionResponse } from 'src/app/models/problem-contribution.model';

export interface Action {
  text: string;
  class: string;
  loading: boolean;
}

export interface ClickEvent {
  target: any;
  idx: number;
}

@Component({
  selector: 'app-contribution-view',
  templateUrl: './contribution-view.component.html',
})
export class ContributionViewComponent {
  @Input() contribution!: ProblemContributionResponse;
  @Input() actions!: Action[];
  @Output() onAction: EventEmitter<ClickEvent>; 
  dictionary: any;

  constructor(languageService: LanguageService) {
    this.dictionary = languageService.dictionary;
    this.onAction = new EventEmitter<ClickEvent>(); 
  }

  onActionClick(target: any, idx: number) : boolean {
    this.onAction.emit({target, idx});
    return false;
  }
}
