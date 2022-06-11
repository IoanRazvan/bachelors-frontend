import { FormControl, Validators } from '@angular/forms';
import { Component, EventEmitter, Output } from '@angular/core';
import { LanguageService } from 'src/app/base/language.base';
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
  dictionary: any;

  constructor(private service: UserListService, languageService: LanguageService) {
    this.submitting = false;
    this.formOpen = false;
    this.control = new FormControl('', Validators.required);
    this.onAdded = new EventEmitter();
    this.dictionary = languageService.dictionary;
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
