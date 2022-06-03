import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UserListService } from 'src/app/core/services/user-list.service';
import { UserListResponse } from 'src/app/models/user-list.model';

@Component({
  selector: 'app-toggleable-user-list-form',
  templateUrl: './toggleable-user-list-form.component.html',
})
export class ToggleableUserListFormComponent {
  formOpen: boolean;
  control: FormControl;
  submitting: boolean;
  @Output() onAdded: EventEmitter<UserListResponse>;

  constructor(private service: UserListService) {
    this.submitting = false;
    this.formOpen = false;
    this.control = new FormControl('', Validators.required);
    this.onAdded = new EventEmitter();
  }

  toggleForm() {
    this.formOpen = !this.formOpen;
    this.control.setValue('');
  }

  onAddClick() {
    this.submitting = true;
    this.service.addList(this.control.value).subscribe(resp => {
      this.onAdded.emit(resp);
      this.submitting = false;
      this.toggleForm();
    });
  }
}
