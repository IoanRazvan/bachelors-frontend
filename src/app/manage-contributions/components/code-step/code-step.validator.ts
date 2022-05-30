import { AbstractControl, ValidationErrors } from "@angular/forms";

let starterComment = '// starter';
let solutionComment = '// solution'

export const codeZonePresentValidator = (control: AbstractControl): ValidationErrors | null => {
    const value: string = control.value;
    const regex = new RegExp(`${starterComment}.*?${solutionComment}.*?${solutionComment}.*?${starterComment}.*?`, 's');
    return value.match(regex) ? null : { codeZone: 'Code zones wrongfully defined' };
}