import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { extractPageInfo, PageInfo } from 'src/app/models/page-info.model';
import { UnassignedContributionRow } from 'src/app/models/problem-contribution.model';
import { ToastMessageService } from 'src/app/shared/services/toast-message.service';
import { ManageContributionsService } from '../../services/manage-contributions.service';

@Component({
  selector: 'app-new-contributions',
  templateUrl: './unassigned-contributions.component.html'
})
export class UnassignedContributionsComponent implements OnInit, OnDestroy {
  data!: UnassignedContributionRow[];
  loading: boolean = true;
  pageInfo!: PageInfo;
  serviceSubscription!: Subscription;

  constructor(private service: ManageContributionsService, private messageService: ToastMessageService) {
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
    this.service.change(0, true);
  }

  onPageChange(page: number) {
    this.loading = true;
    this.service.change(page - 1);
  }

  ngOnDestroy(): void {
      this.messageService.clear();
      this.serviceSubscription?.unsubscribe();
  }
}
