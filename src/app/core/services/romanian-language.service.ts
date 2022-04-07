import { Injectable } from "@angular/core";
import RomaninaLanguage from '../../../assets/romanian.json';
import { LanguageService } from "../base/language.base";

@Injectable()
export class RomanianLanguageService extends LanguageService {
    constructor() {
        super(RomaninaLanguage);
    }
}