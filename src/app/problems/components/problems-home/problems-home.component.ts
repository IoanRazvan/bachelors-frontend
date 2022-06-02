import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { KeycloakService } from 'keycloak-angular';
import { Subscription } from 'rxjs';
import { CategoryService } from 'src/app/core/services/category.service';
import { Category } from 'src/app/models/category.model';
import { ProblemRow, ProblemStatus } from 'src/app/models/problem.model';
import { ProblemPagedService } from '../../services/problems-paged.service';

@Component({
  selector: 'app-problems-home',
  templateUrl: './problems-home.component.html',
  styleUrls: ['problems-home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProblemsHomeComponent implements OnInit, OnDestroy {
  status : ProblemStatus[];
  categories!: Category[];
  selectedDifficulty : FormControl;
  selectedStatus : FormControl;
  selectedCategories: FormControl;
  chips : any[];
  subscription!: Subscription;
  problems !: ProblemRow[];
  loading: boolean;

  constructor(private problemService: ProblemPagedService, private categoryService: CategoryService, key: KeycloakService) {
    key.getToken().then(tok => console.log(tok));
    this.selectedDifficulty = new FormControl(undefined);
    this.selectedStatus = new FormControl(undefined);
    this.status = ['Todo', 'Solved', 'Attempted'];
    this.selectedCategories = new FormControl([]);
    this.chips = [];
    this.loading = true;
  }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(resp => {
      this.categories = resp;
    });
    this.subscription = this.problemService.pages$.subscribe((resp) => {
      this.problems = <any>resp.response?.content;
      this.loading = false;
    })
    this.problemService.change(0, true, {});
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

  onFilteringElementChange() {
    this.chips = [];
    if (this.selectedDifficulty.value)
      this.chips.push(this.selectedDifficulty.value);
    if (this.selectedStatus.value)
      this.chips.push(this.selectedStatus.value);
    console.log(this.selectedCategories.value.map((category : Category) => category.categoryName))
    this.chips.push(...this.selectedCategories.value.map((category : Category) => category.categoryName));
    this.loading = true;
    this.problemService.setParameters({'difficulty': this.selectedDifficulty.value, 'status': this.selectedStatus.value, 'categories': this.selectedCategories.value.map((category : Category) => category.id)})
  }

  onRemove(event: any) {
    this.loading = false;
    if (['EASY', 'HARD', 'MEDIUM'].indexOf(event.value) != -1)
      this.selectedDifficulty.setValue(undefined);
    else if (['Todo', 'Solved', 'Attempted'].indexOf(event.value) != -1)
      this.selectedStatus.setValue(undefined);
    else
      this.selectedCategories.setValue(this.selectedCategories.value.filter((category: Category) => category.categoryName !== event.value))
    this.loading = true;
    this.problemService.setParameters({'difficulty': this.selectedDifficulty.value, 'status': this.selectedStatus.value, 'categories': this.selectedCategories.value.map((category : Category) => category.id)})
  }

  onSearch(query: string) {
    this.loading = true;
    this.problemService.setQuery(query);
  }

  onChange() {
    return false;
  }
}
