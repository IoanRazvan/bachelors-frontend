import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { LanguageService } from './base/language.base';
import { RomanianLanguageService } from './services/romanian-language.service';

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    {provide: LanguageService, useClass: RomanianLanguageService}
  ]
})
export class CoreModule { }
