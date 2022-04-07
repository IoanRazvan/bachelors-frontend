import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageInfo } from '../../../models/page-info.model';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
})
export class PaginatorComponent {
  @Input() pageInfo : PageInfo = {
    page: 1,
    last: true,
    first: true,
  };
  @Input() renderOnSinglePage = false;
  @Output() pageChange = new EventEmitter<number>();

  public shouldRender() : boolean {
    return !(this.pageInfo.first && this.pageInfo.last && !this.renderOnSinglePage);
  }
}
