import { Pipe, PipeTransform } from '@angular/core';
import { LanguageService } from 'src/app/base/language.base';

@Pipe({
  name: 'statusCodeDetails'
})
export class StatusCodeDetailsPipe implements PipeTransform {
  details: any[]

  constructor(languageService: LanguageService) {
    this.details = [
      {text: languageService.dictionary.acceptedAnswer, class: 'text-success'},
      {text: languageService.dictionary.compileError, class: 'text-danger'},
      {text: languageService.dictionary.runtimeError, class: 'text-danger'},
      {text: languageService.dictionary.timeLimitExceeded, class: 'text-danger'},
      {text: languageService.dictionary.wrongAnswer, class: 'text-danger'}
    ];
  }

  transform(statusCode: number, details: 'text' | 'class'): string {
    return this.details[statusCode][details];
  }

}
