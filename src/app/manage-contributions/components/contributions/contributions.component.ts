import { AfterViewInit, Component, ContentChildren, EventEmitter, Input, Output, QueryList, TemplateRef, ViewChild } from '@angular/core';
import { debounceTime, fromEvent } from 'rxjs';
import { LanguageService } from 'src/app/base/language.base';
import { DropdownOption } from 'src/app/models/dropdown-option.model';
import { TemplateDirective } from 'src/app/shared/directives/template.directive';

@Component({
  selector: 'app-contributions',
  templateUrl: './contributions.component.html',
})
export class ContributionsComponent implements AfterViewInit {
  @Input() tip!: string;
  @Input() loading!: boolean;
  @Input() data!: any[]
  @Input() showStats!: boolean;
  @Output() dropdownChange!: EventEmitter<string>;
  @Output() queryChange!: EventEmitter<string>;
  @ViewChild("search")
  search: any;
  sortingOptions: DropdownOption<string, string>[];
  selectedOption: DropdownOption<string, string>;
  table!: TemplateRef<unknown>;
  widget?: TemplateRef<unknown>;
  filter?: TemplateRef<unknown>;
  dictionary: any;

  @ContentChildren(TemplateDirective) 
  public set content(list: QueryList<TemplateDirective>) {
    this.table = <any>list.find(elem => elem.appTemplate === 'table')?.templateRef;
    this.widget = list.find(elem => elem.appTemplate === 'widget')?.templateRef;
    this.filter = list.find(elem => elem.appTemplate === 'filter')?.templateRef;
    
  }

  constructor(languageService: LanguageService) {
    this.dropdownChange = new EventEmitter();
    this.queryChange = new EventEmitter();
    this.dictionary = languageService.dictionary;
    this.sortingOptions = [{ label: this.dictionary.descending, value: "descending" }, { label: this.dictionary.ascending, value: "ascending" }];
    this.selectedOption = this.sortingOptions[0];
  }

  ngAfterViewInit(): void {
    if (this.search)
      fromEvent(this.search.nativeElement, "input").pipe(debounceTime(200)).subscribe((event: any) => {
        this.queryChange.emit(event.target.value);
      })
  }
}
