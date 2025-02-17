import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { LanguageService } from 'src/app/base/language.base';
import { DropdownOption } from 'src/app/models/dropdown-option.model';

@Component({
  selector: 'app-editor-area',
  templateUrl: './editor-area.component.html',
})
export class EditorAreaComponent implements OnChanges {
  @Input() checkingCode!: boolean;
  @Input() editorControl!: AbstractControl;
  @Input() dropdownOptions!: DropdownOption<string, string>[];
  @Input() dropdownControl!: AbstractControl;
  @Input() selectedLanguage: string; 
  @Output() onCheck: EventEmitter<any>;
  @Output() onEditorInit: EventEmitter<any>;
  
  editorOptions: any;
  dictionary: any


  constructor(languageService: LanguageService) {
    this.onCheck = new EventEmitter();
    this.onEditorInit = new EventEmitter();
    this.editorOptions = { theme: 'vs-light', minimap: { enabled: false } };
    this.selectedLanguage = 'javascript';
    this.dictionary = languageService.dictionary;
  }

  ngOnChanges(): void {
    this.editorOptions = {
      ...this.editorOptions,
      language: this.selectedLanguage
    }
  }
}
