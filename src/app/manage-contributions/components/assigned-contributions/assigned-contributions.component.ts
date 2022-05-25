import { Component, OnDestroy, OnInit } from '@angular/core';
import { DeveloperContributionsBase } from 'src/app/base/developer-contributions.base';
import { ManageContributionsService } from 'src/app/core/services/manage-contributions.service';
import { DropdownOption } from 'src/app/models/dropdown-option.model';
import { PageServiceExtras } from 'src/app/models/page-service.model';
import { ToastMessageService } from 'src/app/shared/services/toast-message.service';
import { ContributionsService } from '../../services/contributions.service';

const contributionsProvider = (apiService: ManageContributionsService) => {
  const service = {
    request(page : number, size : number, extras : PageServiceExtras) {
      return apiService.getAssignedContributions(page, size, extras.query, extras.sorting, extras.status);
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
  tip: string;
  statusOptions: DropdownOption<string, string>[];
  selectedStatus: DropdownOption<string, string>;

  constructor(service: ContributionsService, messageService: ToastMessageService, private apiService: ManageContributionsService) {
    super(service, messageService);
    this.showStats = false;
    this.chartOptions = {
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: 'Statistici',
          font: {
            size: 16,
          },
          align: 'center',
          padding: {
            top: 10,
            bottom: 0
          },
          position: 'bottom'
        }
      }
    };
    this.tip = 'Accepta sau respinge contributiile asignate prin intermediul paginilor individuale. Aceptarea unei contributii presupune implementarea solutiei in cele 3 limbaje de programare suportate, iar respingere se poate face numai insotita de motivul pentru care problema este respinsa.';
    this.statusOptions = [{label: "Toate", value: ''}, {label: "Acceptat", value: "ACCEPTED"}, {label: "Respins", value: "REJECTED"}, {label: "Asteptare", value: "PENDING"}];
    this.selectedStatus = this.statusOptions[0];
  }

  protected override setUp() {
    super.setUp();
    this.apiService.getStatistics().subscribe((resp) => {
      console.log(resp);
      if (resp.some(statusCount => statusCount.count != 0)) {
        this.showStats = true;
        this.chartData = {
          labels: resp.map(statusCount => statusCount.status),
          datasets: [{
            data: resp.map(statusCount => statusCount.count),
            backgroundColor: ["#ffc107", "#dc3545", "#198754"],
            hoverBackgroundColor: ["#ffcd39", "#b02a37", "#146c43"]
          }]
        };
        console.log(this.chartData);
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