import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appContributionsContent]'
})
export class ContributionsContentDirective {
  @Input() appContributionsContent!: string;

  constructor(public templateRef: TemplateRef<unknown>) {}
}
