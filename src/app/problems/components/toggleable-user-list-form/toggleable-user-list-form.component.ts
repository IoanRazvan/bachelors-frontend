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
  submitting: boolean;
  value: string;
  @Output() onAdded: EventEmitter<UserListResponse>;
  dictionary: any;

  constructor(private service: UserListService, languageService: LanguageService) {
    this.submitting = false;
    this.formOpen = false;
    this.value = '';
    this.onAdded = new EventEmitter();
    this.dictionary = languageService.dictionary;
  }

  toggleForm() {
    this.formOpen = !this.formOpen;
    this.value = '';
  }

  onSubmit(stringTitle: string) {
    this.submitting = true;
    this.service.addList(stringTitle).subscribe(resp => {
      this.onAdded.emit(resp);
      this.submitting = false;
      this.toggleForm();
    });
  }
}
