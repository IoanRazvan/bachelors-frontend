import { Location } from '@angular/common';
import { HttpStatusCode } from '@angular/common/http';
import { Component, Input, OnChanges, ViewEncapsulation } from '@angular/core';
import { LanguageService } from 'src/app/base/language.base';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['error-page.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ErrorPageComponent implements OnChanges {
  @Input() errorStatus!: number;
  message!: string;
  dictionary: any;

  constructor(languageService: LanguageService, private location: Location) {
    this.dictionary = languageService.dictionary;
  }

  ngOnChanges(): void {
    switch(this.errorStatus) {
      case HttpStatusCode.Forbidden:
        this.message = this.dictionary.errorPageForbiddenStatus;
        break;
      case HttpStatusCode.BadRequest:
        this.message = this.dictionary.errorPageBadRequestStatus;
        break;
      default:
        this.message = this.dictionary.errorPageDefaultStatus;
        break;
    }
  }

  goBack() {
    this.location.back();
  }
}
