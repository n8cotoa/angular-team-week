import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../../../../services/user-data.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: any;
  checked: boolean;

  constructor(private userDataService: UserDataService) { }

  ngOnInit() {
    this.getUsersList();
  }

  getUsersList() {
    this.userDataService.getAllUsers().pipe(
      map(changes => 
        changes.map(c => ({...c.payload.doc.data()}))
      )
    ).subscribe(users => {
      this.users = users;
    });
  }

  toggleAdmin(uid: string, user) {
    if (user.roles.admin) {
      this.userDataService.removeAdminRole(uid);
    } else {
      this.userDataService.giveAdminRole(uid);
    }
  }
}
