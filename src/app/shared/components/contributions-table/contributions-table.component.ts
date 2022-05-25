import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LanguageService } from 'src/app/base/language.base';
import { PageInfo } from 'src/app/models/page-info.model';
import { ContributionsTableColumnClass } from '../../../models/contributions-table.model';

@Component({
  selector: 'app-contributions-table',
  templateUrl: './contributions-table.component.html'
})
export class ContributionsTableComponent {
  @Input() data!: any[];
  @Input() pageInfo!: PageInfo;
  @Output() onPageChange: EventEmitter<number>;
  dictionary: any;
  @Input() columns!: ContributionsTableColumnClass;
  thClasses: string[];

  constructor(languageService: LanguageService) {
    this.onPageChange = new EventEmitter();
    this.dictionary = languageService.dictionary;
    this.thClasses = ['text-muted', 'pt-0', 'fw-light', 'border-0'];
  }
}
