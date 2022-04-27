import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MessageService } from 'primeng/api';
import { LanguageService } from './base/language.base';
import { RomanianLanguageService } from './services/romanian-language.service';

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    {provide: LanguageService, useClass: RomanianLanguageService},
    MessageService
  ]
})
export class CoreModule { }
