import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function codeZonePresentValidator(starterComment: string, solutionComment: string) : ValidatorFn {
    return (control: AbstractControl) : ValidationErrors | null => {
        const value : string = control.value;
        const regex = new RegExp(`${starterComment}.*?${solutionComment}.*?${solutionComment}.*?${starterComment}.*?`, 's');
        return value.match(regex) ? null : {codeZone: 'Code zones wrongfully defined'};
    }
}