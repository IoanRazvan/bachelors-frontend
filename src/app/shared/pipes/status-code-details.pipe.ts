import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusCodeDetails'
})
export class StatusCodeDetailsPipe implements PipeTransform {
  details: any[]

  constructor() {
    this.details = [
      {text: 'Accepted Answer', class: 'text-success'},
      {text: 'Compile Error', class: 'text-danger'},
      {text: 'Runtime Error', class: 'text-danger'},
      {text: 'Time Limit Exceeded', class: 'text-danger'},
      {text: 'Wrong Answer', class: 'text-danger'}
    ];
  }

  transform(statusCode: number, details: 'text' | 'class'): string {
    return this.details[statusCode][details];
  }

}
