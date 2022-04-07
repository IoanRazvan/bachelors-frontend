import { Component } from '@angular/core';

@Component({
  selector: 'app-centered',
  template: `
    <div class="row justify-content-center">
      <div class="col-auto">
        <ng-content></ng-content>
      </div>
    </div>
  `,
})
export class CenteredComponent {
}
