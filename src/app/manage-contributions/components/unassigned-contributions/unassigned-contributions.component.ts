import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DeveloperContributionsBase } from 'src/app/base/developer-contributions.base';
import { ManageContributionsService } from 'src/app/core/services/manage-contributions.service';
import { PageServiceExtras } from 'src/app/models/page-service.model';
import { ToastMessageService } from 'src/app/shared/services/toast-message.service';
import { ContributionsService } from '../../services/contributions.service';

const contributionsProvider = (apiService : ManageContributionsService) => {
  const service = {
    request(page: number, pageSize: number, extras?: PageServiceExtras): Observable<any> {
      return apiService.getUnassignedContributions(page, pageSize, extras?.query, extras?.sorting);
    }
  };
  return new ContributionsService(service);
}

@Component({
  selector: 'app-new-contributions',
  templateUrl: './unassigned-contributions.component.html',
  providers: [{
    provide: ContributionsService,
    useFactory: contributionsProvider,
    deps: [ManageContributionsService]
  }]
})
export class UnassignedContributionsComponent extends DeveloperContributionsBase implements OnInit, OnDestroy {
  tip: string;

  constructor(service: ContributionsService, messageService: ToastMessageService) {
    super(service, messageService);
    this.tip = `Pentru a putea trata submisia unui utilizator este nevoie sa o asignezi inainte. Acest pas este necesar pentru a evita situatia cand doi dezvoltatori lucreaza la aceasi submisie. O data asignata, submisia va aparea in tabul <a [routerLink]="['..', 'assigned']">contributii asignate</a> de unde poate fi acceptata sau refuzata, oferind detalii suplimentare.`
  }

  ngOnInit(): void {
    this.setUp();
  }

  ngOnDestroy(): void {
    this.cleanup();
  }
}
