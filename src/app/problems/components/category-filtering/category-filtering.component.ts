import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LanguageService } from 'src/app/base/language.base';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-category-filtering',
  templateUrl: './category-filtering.component.html',
  styleUrls: ['category-filtering.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CategoryFilteringComponent {
  @Input() control!: FormControl;
  @Input() categories!: Category[];
  @Output() onChange: EventEmitter<any>;
  dictionary: any;

  constructor(languageService: LanguageService) {
    this.onChange = new EventEmitter();
    this.dictionary = languageService.dictionary;
  }

  categoryClass(category: Category): string {
    if (this.control.value.indexOf(category) !== -1)
      return 'category-filtering badge rounded-pill btn btn-primary';
    return 'category-filtering badge rounded-pill btn btn-outline-primary'
  }

}
