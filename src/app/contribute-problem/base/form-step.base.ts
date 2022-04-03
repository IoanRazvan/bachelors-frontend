import { LanguageService } from "src/app/core/services/language.service";


export abstract class FormStepBase {
    form!: any;
    formData: any;
    onNextStep: any;
    onPrevStep: any;
    dictionary: any;

    constructor(languageService: LanguageService) {
        this.dictionary = languageService.dictionary;
    }

    protected abstract setForm() : void;

    onNextStepClick() {
        this.onNextStep.emit(this.form.value);
    }

    onPrevStepClick() {
        this.onPrevStep.emit(this.form.value);
    }
}