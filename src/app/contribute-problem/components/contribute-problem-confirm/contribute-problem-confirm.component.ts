import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ContributeProblemFormData } from '../contribute-problem-form/contribute-problem-form.component';

@Component({
  selector: 'app-contribute-problem-confirm',
  templateUrl: './contribute-problem-confirm.component.html',
})
export class ContributeProblemConfirmComponent {
  @Input() formData!: ContributeProblemFormData;
  @Output() onPrevStep = new EventEmitter<any>();
}
