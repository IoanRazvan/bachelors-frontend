import { AbstractControl, ValidationErrors } from "@angular/forms";

let starterComment = '// starter';
let solutionComment = '// solution'

export const codeZonePresentValidator = (control: AbstractControl): ValidationErrors | null => {
    const value: string = control.value;
    const regex = new RegExp(`${starterComment}.*?${solutionComment}.*?${solutionComment}.*?${starterComment}.*?`, 's');
    return value.match(regex) ? null : { codeZone: 'Code zones wrongfully defined' };
}

export const codeRanWithNoErrorsValidator = (control: AbstractControl): ValidationErrors | null => {
    const value: any = control.value;
    return value.javascript && value.cpp && value.java ? null : { noErrorsRun: 'All solutions must run with no errors' }
}