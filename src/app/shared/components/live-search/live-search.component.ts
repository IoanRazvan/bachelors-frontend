import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { debounceTime, fromEvent } from 'rxjs';

@Component({
  selector: 'app-live-search',
  templateUrl: './live-search.component.html',
})
export class LiveSearchComponent implements AfterViewInit {
  @Input() placeholder!: string;
  @Output() queryChange: EventEmitter<string>;
  @ViewChild("search")
  search : any;

  constructor() {
    this.queryChange = new EventEmitter();
  }

  ngAfterViewInit(): void {
    if (this.search)
      fromEvent(this.search.nativeElement, "input").pipe(debounceTime(200)).subscribe((event: any) => {
        this.queryChange.emit(event.target.value);
      })
  }
}
