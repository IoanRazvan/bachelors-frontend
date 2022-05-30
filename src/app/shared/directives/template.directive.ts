import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appTemplate]'
})
export class TemplateDirective {
  @Input() appTemplate: string = 'content';

  constructor(public templateRef: TemplateRef<unknown>) {
  }
}
