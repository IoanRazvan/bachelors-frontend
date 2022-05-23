import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ContributionsManagementService } from 'src/app/core/services/contributions-mananagement.service';
import { ToastMessageService } from 'src/app/shared/services/toast-message.service';

@Component({
  selector: 'app-refuse-contribution-form',
  templateUrl: './refuse-contribution-form.component.html',
})
export class RefuseContributionFormComponent implements OnInit {
  statusDetails: FormControl;
  id!: string;
  contributionWasRefused: boolean;
  loading: boolean;

  constructor(private route: ActivatedRoute, private service: ContributionsManagementService, private toastService: ToastMessageService) {
    this.statusDetails = new FormControl('', Validators.required);
    this.contributionWasRefused = false;
    this.loading = false;
  }

  ngOnInit(): void {
    this.route.params.subscribe(({ id }) => {
      this.id = id;
    });
  }

  onClick() {
    this.loading = true;
    this.service.refuseContribution(this.id, this.statusDetails.value).subscribe({
      next: () => {
        this.loading = false;
        this.contributionWasRefused = true;
        this.toastService.addSuccess("Contributia a fost refuzata cu succes");
      },
      error: () => {
        this.loading = false;
        this.toastService.addError("Contributia nu a putut fi refuzata");
      }
    });
  }
}
