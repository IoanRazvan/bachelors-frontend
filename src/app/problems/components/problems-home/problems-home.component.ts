import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LanguageService } from 'src/app/base/language.base';
import { CategoryService } from 'src/app/core/services/category.service';
import { Category, PROBLEM_DIFFICULTIES } from 'src/app/models/category.model';
import { extractPageInfo, PageInfo } from 'src/app/models/page-info.model';
import { ProblemRow, PROBLEM_STATUSES } from 'src/app/models/problem.model';
import { ProblemPagedService } from '../../services/problems-paged.service';

@Component({
  selector: 'app-problems-home',
  templateUrl: './problems-home.component.html',
  styleUrls: ['problems-home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProblemsHomeComponent implements OnInit, OnDestroy {
  categories!: Category[];
  selectedDifficulty : FormControl;
  selectedStatus : FormControl;
  selectedCategories: FormControl;
  chips : any[];
  subscription!: Subscription;
  problems !: ProblemRow[];
  pageInfo !: PageInfo;
  loading: boolean;
  dictionary: any;

  constructor(private problemService: ProblemPagedService, private categoryService: CategoryService, languageService: LanguageService) {
    this.selectedDifficulty = new FormControl(undefined);
    this.selectedStatus = new FormControl(undefined);
    this.selectedCategories = new FormControl([]);
    this.chips = [];
    this.loading = true;
    this.dictionary = languageService.dictionary
  }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(resp => {
      this.categories = resp;
    });
    this.subscription = this.problemService.pages$.subscribe((resp) => {
      if (!resp.error) {
        this.problems = <any>resp.response?.content;
        this.pageInfo = extractPageInfo(<any>resp?.response);
      }
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
    this.chips.push(...this.selectedCategories.value.map((category : Category) => category.categoryName));
    this.loading = true;
    this.problemService.setParameters({'difficulty': this.selectedDifficulty.value, 'status': this.selectedStatus.value, 'categories': this.selectedCategories.value.map((category : Category) => category.id)})
  }

  onRemove(event: any) {
    this.loading = false;
    if (PROBLEM_DIFFICULTIES.indexOf(event.value) != -1)
      this.selectedDifficulty.setValue(undefined);
    else if (PROBLEM_STATUSES.indexOf(event.value) != -1)
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

  onPageChange(page: number) {
    this.loading = true;
    this.problemService.change(page - 1);
  }
}
