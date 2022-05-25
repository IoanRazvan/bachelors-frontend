import { AfterViewInit, Component, ContentChildren, EventEmitter, Input, Output, QueryList, TemplateRef, ViewChild } from '@angular/core';
import { debounceTime, fromEvent } from 'rxjs';
import { DropdownOption } from 'src/app/models/dropdown-option.model';
import { ContributionsContentDirective } from '../../directives/contributions-content.directive';

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
  sortingOptions: DropdownOption<string, string>[];
  selectedOption: DropdownOption<string, string>;
  @ViewChild("search")
  search: any;
  table!: TemplateRef<unknown>;
  widget?: TemplateRef<unknown>;
  filter?: TemplateRef<unknown>;

  
  @ContentChildren(ContributionsContentDirective) 
  public set content(list: QueryList<ContributionsContentDirective>) {
    this.table = <any>list.find(elem => elem.appContributionsContent === 'table')?.templateRef;
    this.widget = list.find(elem => elem.appContributionsContent === 'widget')?.templateRef;
    this.filter = list.find(elem => elem.appContributionsContent === 'filter')?.templateRef;
    
  }

  constructor() {
    this.dropdownChange = new EventEmitter();
    this.queryChange = new EventEmitter();
    this.sortingOptions = [{ label: "Descrescator", value: "descending" }, { label: "Crescator", value: "ascending" }];
    this.selectedOption = this.sortingOptions[0];
  }

  ngAfterViewInit(): void {
    if (this.search)
      fromEvent(this.search.nativeElement, "input").pipe(debounceTime(200)).subscribe((event: any) => {
        this.queryChange.emit(event.target.value);
      })
  }
}
