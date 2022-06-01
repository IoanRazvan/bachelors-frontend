import { Component } from '@angular/core';

@Component({
  selector: 'app-problems-home',
  templateUrl: './problems-home.component.html',
})
export class ProblemsHomeComponent {
  difficulties = ['Easy', 'Medium', 'Hard'];
  selectedDifficulty = '';
  chips : string[]= [];
  status = ['Todo', 'Solved', 'Attempted'];
  selectedStatus = '';
  tags = ['Array', 'String', 'Dynmaic Programming', 'Math', 'Sorting'];

  getDifficultyClass(difficulty : string) : string {
    switch (difficulty) {
      case 'Easy':
        return 'text-success';
      case 'Medium':
        return 'text-warning';
      default:
        return 'text-danger';
    }
  }

  getStatusClass(item: string) : string {
    switch (item) {
      case 'Todo':
        return 'pi pi-minus text-muted';
      case 'Solved':
        return 'pi pi-check text-success';
      default:
        return 'pi pi-refresh text-warning';
    }
  }

  onDifficultyChange() {
    this.chips = this.chips.filter(item => item !== 'Easy' && item !== 'Medium' && item !== 'Hard');
    this.chips.push(this.selectedDifficulty);
  }

  onStatusChange() {
    this.chips = this.chips.filter(item => item !== 'Todo' && item !== 'Solved' && item !== 'Attempted')
    this.chips.push(this.selectedStatus);
  }

  onRemove(event: any) {
    if (['Easy', 'Hard', 'Medium'].indexOf(event.value) != -1)
      this.selectedDifficulty = '';
    else
      this.selectedStatus = '';
  }

  onChange() {
    return false;
  }
}
