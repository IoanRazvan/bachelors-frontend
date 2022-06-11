import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { LanguageService } from 'src/app/base/language.base';
import { ProblemDifficulty } from 'src/app/models/category.model';

@Pipe({
  name: 'difficultyDetails'
})
@Injectable({
  providedIn: 'root'
})
export class DifficultyDetailsPipe implements PipeTransform {
  values: Map<ProblemDifficulty, any>

  constructor(languageService: LanguageService) {
    this.values = new Map([
      ['EASY', {class: 'text-success', text: languageService.dictionary.easy}], 
      ['MEDIUM', {class: 'text-warning', text: languageService.dictionary.medium}],
      ['HARD', {class: 'text-danger', text: languageService.dictionary.hard}]]
    );
  }

  transform(difficulty: ProblemDifficulty, detail: string): string {
    return this.values.get(difficulty)[detail];
  }

}
