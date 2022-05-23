import { Injectable } from "@angular/core";
import { Message, MessageService } from "primeng/api";
import { LanguageService } from "src/app/core/base/language.base";
import { NotificationType } from "src/app/manage-contributions/services/notifcation.service";

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

    addMessage(message: string, type: NotificationType, options ?: Partial<Message>) {
        if (type === "SUCCESS")
            this.addSuccess(message, options);
        else
            this.addError(message, options);
    }

    clear() {
        this.messageService.clear();
    }
}