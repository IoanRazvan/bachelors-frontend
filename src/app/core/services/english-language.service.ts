import { Injectable } from "@angular/core";
import EnglishLanguage from '../../../assets/english.json'
import { LanguageService } from "./language.service";

@Injectable()
export class EnglishLanguageService extends LanguageService {
    constructor() {
        super(EnglishLanguage);
    }
}