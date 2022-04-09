import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-page',
  templateUrl: './loading-page.component.html',
})
export class LoadingPageComponent {
  @Input() loading: boolean = false;
}
