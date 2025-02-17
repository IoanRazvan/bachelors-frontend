import { Component, OnDestroy, OnInit } from '@angular/core';
import { DeveloperContributionsBase } from 'src/app/base/developer-contributions.base';
import { LanguageService } from 'src/app/base/language.base';
import { ManageContributionsService } from 'src/app/core/services/manage-contributions.service';
import { DropdownOption } from 'src/app/models/dropdown-option.model';
import { SortingType } from 'src/app/models/page.model';
import { ProblemContributionStatus } from 'src/app/models/problem-contribution.model';
import { ToastMessageService } from 'src/app/shared/services/toast-message.service';
import { ContributionsService } from '../../services/contributions.service';

const contributionsProvider = (apiService: ManageContributionsService) => {
  const service = {
    request(page: number, size: number, parameters: { [key: string]: string }) {
      return apiService.getAssignedContributions(page, size, parameters['query'], <SortingType>parameters['order'], <ProblemContributionStatus>parameters['status']);
    }
  };
  return new ContributionsService(service);
}

@Component({
  selector: 'app-assigned-contributions',
  templateUrl: './assigned-contributions.component.html',
  providers: [
    {
      provide: ContributionsService,
      useFactory: contributionsProvider,
      deps: [ManageContributionsService]
    }
  ]
})
export class AssignedContributionsComponent extends DeveloperContributionsBase implements OnInit, OnDestroy {
  showStats: boolean;
  chartData: any;
  chartOptions: any;
  statusOptions: DropdownOption<string, string>[];
  selectedStatus: DropdownOption<string, string>;

  constructor(service: ContributionsService, messageService: ToastMessageService, private apiService: ManageContributionsService, languageService: LanguageService) {
    super(service, messageService, languageService);
    this.showStats = false;
    this.chartOptions = {
      plugins: {
        legend: {
          display: false,
        }
      }
    };
    this.statusOptions = [{ label: this.dictionary.all, value: '' }, { label: this.dictionary.accepted, value: "ACCEPTED" }, { label: this.dictionary.rejected, value: "REJECTED" }, { label: this.dictionary.pending, value: "PENDING" }];
    this.selectedStatus = this.statusOptions[0];
  }

  protected override setUp() {
    super.setUp();
    this.apiService.getStatistics().subscribe({
      next: resp => {
        if (resp.some(statusCount => statusCount.count != 0)) {
          this.showStats = true;
          this.chartData = {
            labels: [this.dictionary.pending, this.dictionary.accepted2, this.dictionary.rejected2],
            datasets: [{
              data: resp.map(statusCount => statusCount.count),
              backgroundColor: ["#ffc107", "#198754", "#dc3545"],
              hoverBackgroundColor: ["#ffcd39", "#146c43", "#b02a37"]
            }]
          };
        }
      },
      error: () => {
        this.messageService.addError('Statisticile nu au putut fi incarcate');
      }
    })
  }

  onStatusChange(event: any) {
    this.loading = true;
    this.service.setStatus(event.value);
  }

  ngOnInit(): void {
    this.setUp();
  }

  ngOnDestroy(): void {
    this.cleanup();
  }
}