import { Injectable } from "@angular/core";
import { LanguageService } from "./language.service";
import RomaninaLanguage from '../../../assets/romanian.json'

@Injectable()
export class RomanianLanguageService extends LanguageService {
    constructor() {
        super(RomaninaLanguage);
    }
}