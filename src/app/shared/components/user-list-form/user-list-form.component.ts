import { FormControl, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { LanguageService } from 'src/app/base/language.base';

@Component({
  selector: 'app-user-list-form',
  templateUrl: './user-list-form.component.html',
})
export class UserListFormComponent implements OnChanges {
  control: FormControl;
  @Input() submitting!: boolean;
  @Input() value!: string;
  @Output() onCancel: EventEmitter<any>;
  @Output() onSubmit: EventEmitter<string>;
  dictionary: any;

  constructor(languageService: LanguageService) {
    this.control = new FormControl('', Validators.required);
    this.onSubmit = new EventEmitter();
    this.onCancel = new EventEmitter();
    this.dictionary = languageService.dictionary;
  }

  ngOnChanges(): void {
    this.resetControl();
  }

  onCancelClick() {
    this.resetControl()
    this.onCancel.emit();
  }

  private resetControl() {
    this.control.setValue(this.value);
    this.control.markAsPristine();
  }
}
