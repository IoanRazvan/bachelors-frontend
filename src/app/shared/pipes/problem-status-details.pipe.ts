import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { LanguageService } from 'src/app/base/language.base';
import { ProblemStatus } from 'src/app/models/problem.model';

@Pipe({
  name: 'problemStatusDetails'
})
@Injectable({
  providedIn: 'root'
})
export class ProblemStatusDetailsPipe implements PipeTransform {
  values: Map<ProblemStatus, any>

  constructor(languageService: LanguageService) {
    this.values = new Map([
      ['Todo', {class: 'text-muted pi pi-minus', text: languageService.dictionary.todo}], 
      ['Solved', {class: 'text-success pi pi-check', text: languageService.dictionary.solved}],
      ['Attempted', {class: 'text-warning pi pi-refresh', text: languageService.dictionary.attempted}]]
    );
  }
  transform(status: ProblemStatus, detail: string): string {
    return this.values.get(status)[detail];
  }

}
