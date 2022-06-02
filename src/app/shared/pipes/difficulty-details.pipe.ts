import { Pipe, PipeTransform } from '@angular/core';
import { ProblemDifficulty } from 'src/app/models/category.model';

@Pipe({
  name: 'difficultyDetails'
})
export class DifficultyDetailsPipe implements PipeTransform {
  values: Map<ProblemDifficulty, any>

  constructor() {
    this.values = new Map([
      ['EASY', {class: 'text-success'}], 
      ['MEDIUM', {class: 'text-warning'}],
      ['HARD', {class: 'text-danger'}]]
    );
  }

  transform(difficulty: ProblemDifficulty, detail: string): string {
    return this.values.get(difficulty)[detail];
  }

}
