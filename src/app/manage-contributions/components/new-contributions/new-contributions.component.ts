import { animate, keyframes, query, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ProblemContributionResponse } from 'src/app/models/problem-contribution.model';
import { ManageContributionsService } from '../../services/manage-contributions.service';

@Component({
  selector: 'app-new-contributions',
  templateUrl: './new-contributions.component.html',
  animations: [
    trigger('removeItemAnimation', [
      transition(':leave, * => 0', []),
      transition("* => *", [
        query(":leave", [
          animate('0.6s ease-out', keyframes([
            style({ opacity: 1, transform: 'translateX(0)', position: 'static', offset: 0 }),
            style({ opacity: 0.5, transform: 'translateX(40px)', position: 'static', offset: 0.5 }),
            style({ opacity: 0, transform: 'translateX(80px)', position: 'static', offset: 1 }),
          ]))], { optional: true })
      ])
    ])
  ]
})
export class NewContributionsComponent implements OnInit, OnDestroy {
  data: ProblemContributionResponse[] = [];
  assign: FormControl = new FormControl(false);
  tr = false;

  constructor(private service: ManageContributionsService) {
  }

  onAssign(id: number) {
    this.data = this.data.filter(item => item.id !== id);
  }

  ngOnInit(): void {
    this.service.pages$.subscribe((resp) => {
      if (!resp.error) {
        this.data = <any>resp.response?.content;
      }
    });
    this.service.change(0, true);
  }

  ngOnDestroy(): void {
    this.data = [];
  }
}
