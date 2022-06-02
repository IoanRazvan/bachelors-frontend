import { Pipe, PipeTransform } from '@angular/core';
import { ProblemStatus } from 'src/app/models/problem.model';

@Pipe({
  name: 'problemStatusDetails'
})
export class ProblemStatusDetailsPipe implements PipeTransform {
  values: Map<ProblemStatus, any>

  constructor() {
    this.values = new Map([
      ['Todo', {class: 'text-muted pi pi-minus'}], 
      ['Solved', {class: 'text-success pi pi-check'}],
      ['Attempted', {class: 'text-warning pi pi-refresh'}]]
    );
  }
  transform(status: ProblemStatus, detail: string): string {
    return this.values.get(status)[detail];
  }

}
