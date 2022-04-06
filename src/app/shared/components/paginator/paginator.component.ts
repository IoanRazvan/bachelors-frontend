import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageInfo } from '../../../models/page-info.model';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
})
export class PaginatorComponent {
  @Input() pageInfo !: PageInfo;
  @Output() pageChange = new EventEmitter<number>();
}
