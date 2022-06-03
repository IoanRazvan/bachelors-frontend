import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserListService } from 'src/app/core/services/user-list.service';
import { UserListRow } from 'src/app/models/user-list.model';

@Component({
  selector: 'app-list-add-dropdown',
  templateUrl: './list-add-dropdown.component.html',
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

}
