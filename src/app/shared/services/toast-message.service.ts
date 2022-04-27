import { Injectable } from "@angular/core";
import { Message, MessageService } from "primeng/api";
import { LanguageService } from "src/app/core/base/language.base";

@Injectable()
export class ToastMessageService {
    dictionary: any;

    constructor(languageService: LanguageService, private messageService: MessageService) {
        this.dictionary = languageService.dictionary;
    }

    addError(message: string, options ?: Partial<Message>) {
        this.messageService.add({
            severity: 'error',
            summary: this.dictionary.errorSummary,
            detail: message,
            ...options
        });
    }

    addSuccess(message: string, options ?: Partial<Message>) {
        this.messageService.add({
            severity: 'success',
            summary: this.dictionary.successSummary,
            detail: message,
            ...options
        });
    }

    clear() {
        this.messageService.clear();
    }
}