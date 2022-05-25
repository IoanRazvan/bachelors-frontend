import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ManageContributionsService } from 'src/app/core/services/manage-contributions.service';
import { ToastMessageService } from 'src/app/shared/services/toast-message.service';

@Component({
  selector: 'app-reject-contribution-form',
  templateUrl: './reject-contribution-form.component.html',
})
export class RejectContributionFormComponent implements OnInit {
  statusDetails: FormControl;
  id!: string;
  contributionWasRejected: boolean;
  loading: boolean;

  constructor(private route: ActivatedRoute, private service: ManageContributionsService, private toastService: ToastMessageService) {
    this.statusDetails = new FormControl('', Validators.required);
    this.contributionWasRejected = false;
    this.loading = false;
  }

  ngOnInit(): void {
    this.route.params.subscribe(({ id }) => {
      this.id = id;
    });
  }

  onClick() {
    this.loading = true;
    this.service.rejectContribution(this.id, this.statusDetails.value).subscribe({
      next: () => {
        this.loading = false;
        this.contributionWasRejected = true;
        this.toastService.addSuccess("Contributia a fost refuzata cu succes");
      },
      error: () => {
        this.loading = false;
        this.toastService.addError("Contributia nu a putut fi refuzata");
      }
    });
  }
}
