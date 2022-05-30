import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormStepBase } from 'src/app/base/form-step.base';
import { LanguageService } from 'src/app/base/language.base';
import { CategoryService } from 'src/app/core/services/category.service';
import { Category, ProblemDifficulty } from 'src/app/models/category.model';

@Component({
  selector: 'app-additional-details-step',
  templateUrl: './additional-details-step.component.html',
})
export class AdditionalDetailsStepComponent extends FormStepBase implements OnInit {
  categories!: Category[];
  loading: boolean;
  difficulties: ProblemDifficulty[];
  override form: FormGroup;
  @Output() override onStep: any;
  @Output() onSubmit: EventEmitter<any>;
  @Input() override formData: any;
  @Input() submitted!: boolean;

  constructor(private service: CategoryService, languageService: LanguageService, fb: FormBuilder) {
    super(languageService);
    this.loading = true;
    this.difficulties = ["HARD", "EASY", "MEDIUM"];
    this.onStep = new EventEmitter();
    this.onSubmit = new EventEmitter();
    this.form = fb.group({
      difficulty: ['', Validators.required],
      selectedCategories: [[], Validators.required]
    })
  }

  ngOnInit(): void {
    this.setForm();
    this.service.getCategories().subscribe((resp) => {
      this.categories = resp;
      this.loading = false;
    });
  }

  protected setForm(): void {
    this.form.setValue({
      difficulty: this.formData.difficulty || '',
      selectedCategories: this.formData.selectedCategories || []
    });
  }

  check() {
    console.log(this.form.value);
  }

  onSubmitClick() {
    this.onSubmit.emit(this.form.value);
  }
}
