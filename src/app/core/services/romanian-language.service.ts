import { Injectable } from "@angular/core";
import { LanguageService } from "../base/language.base";
import RomaninaLanguage from '../../../assets/romanian.json'

@Injectable()
export class RomanianLanguageService extends LanguageService {
    constructor() {
        super(RomaninaLanguage);
    }
}