import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { debounceTime, fromEvent, Subscription } from 'rxjs';
import { DropdownOption } from 'src/app/models/dropdown-option.model';
import { extractPageInfo, PageInfo } from 'src/app/models/page-info.model';
import { UnassignedContributionRow } from 'src/app/models/problem-contribution.model';
import { ToastMessageService } from 'src/app/shared/services/toast-message.service';
import { UnassignedContributionsService } from '../../services/unassigned-contributions.service';

@Component({
  selector: 'app-new-contributions',
  templateUrl: './unassigned-contributions.component.html'
})
export class UnassignedContributionsComponent implements OnInit, OnDestroy, AfterViewInit {
  data!: UnassignedContributionRow[];
  loading: boolean = true;
  pageInfo!: PageInfo;
  serviceSubscription!: Subscription;
  sortingOptions: DropdownOption<string, string>[];
  selectedOption: DropdownOption<string, string>;
  @ViewChild("search")
  search: any;

  constructor(private service: UnassignedContributionsService, private messageService: ToastMessageService) {
    this.sortingOptions = [{ label: "Descrescator", value: "descending" }, { label: "Crescator", value: "ascending" }];
    this.selectedOption = this.sortingOptions[0];
  }

  ngOnInit(): void {
    this.serviceSubscription = this.service.pages$.subscribe((resp) => {
      if (!resp.error) {
        this.data = <any>resp.response?.content;
        this.pageInfo = extractPageInfo(<any>resp.response);
      } else {
        this.messageService.addError("Noile contributii nu au putut fi incarcate.")
      }
      this.loading = false;
    });
    this.service.change(0, { query: '', sorting: 'descending', force: true });
  }

  ngAfterViewInit(): void {
    if (this.search) {
      fromEvent(this.search.nativeElement, "input").pipe(debounceTime(200)).subscribe((event: any) => {
        this.service.setQuery(event.target.value)
      })
    }
  }

  onPageChange(page: number) {
    this.loading = true;
    this.service.change(page - 1);
  }

  onOrderChange(event: any) {
    this.loading = true;
    this.service.setSorting(event.value);
  }

  ngOnDestroy(): void {
    this.messageService.clear();
    this.serviceSubscription?.unsubscribe();
  }
}
