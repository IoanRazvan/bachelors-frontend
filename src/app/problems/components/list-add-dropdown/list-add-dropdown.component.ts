import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserListService } from 'src/app/core/services/user-list.service';
import { UserListResponse, UserListRow } from 'src/app/models/user-list.model';

@Component({
  selector: 'app-list-add-dropdown',
  templateUrl: './list-add-dropdown.component.html',
  styleUrls: ['list-add-dropdown.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ListAddDropdownComponent implements OnInit {
  lists!: UserListRow[];
  problemId!: number;
  selectedLists!: UserListRow[];

  constructor(private service: UserListService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(({id}) => {
      this.service.getLists(id).subscribe((resp) => {
        this.lists = resp;
        this.selectedLists = resp.filter(userList => userList.containsProblem)
      });
      this.problemId = id;
    })
  }

  addList(list: UserListResponse) {
    this.lists = this.lists.concat(Object.assign({}, {containsProblem: false}, list));
  }
}
