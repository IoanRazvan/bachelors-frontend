import { Injectable } from "@angular/core";
import LanguageJson from '../../../assets/english.json';

@Injectable({
    providedIn: 'root'
})
export class LanguageService {
    dictionary = LanguageJson;
} 