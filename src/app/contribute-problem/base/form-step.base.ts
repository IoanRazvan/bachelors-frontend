import { LanguageService } from "src/app/core/base/language.base";
import { StepType } from "src/app/models/step.type";


export abstract class FormStepBase {
    form!: any;
    formData: any;
    onStep: any;
    dictionary: any;

    constructor(languageService: LanguageService) {
        this.dictionary = languageService.dictionary;
    }

    protected abstract setForm() : void;

    onStepClick(stepType: StepType) {
        this.onStep.emit({stepType, data: this.form.value});
    }
}