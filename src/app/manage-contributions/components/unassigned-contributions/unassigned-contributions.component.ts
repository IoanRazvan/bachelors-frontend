import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DeveloperContributionsBase } from 'src/app/base/developer-contributions.base';
import { LanguageService } from 'src/app/base/language.base';
import { ManageContributionsService } from 'src/app/core/services/manage-contributions.service';
import { SortingType } from 'src/app/models/page.model';
import { ToastMessageService } from 'src/app/shared/services/toast-message.service';
import { ContributionsService } from '../../services/contributions.service';

const contributionsProvider = (apiService : ManageContributionsService) => {
  const service = {
    request(page: number, pageSize: number, parameters: {[key: string]: string}): Observable<any> {
      return apiService.getUnassignedContributions(page, pageSize, parameters['query'], <SortingType>parameters['order']);
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

  constructor(service: ContributionsService, messageService: ToastMessageService, languageService: LanguageService) {
    super(service, messageService, languageService);
  }

  ngOnInit(): void {
    this.setUp();
  }

  ngOnDestroy(): void {
    this.cleanup();
  }
}
