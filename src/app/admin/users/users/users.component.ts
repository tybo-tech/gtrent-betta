import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/models/user.model';
import { AccountService } from 'src/services/account.service';
import { UserService } from 'src/services/user.service';
import { UxService } from 'src/services/ux.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  showFilter = true;
  items = [];
  loggedInUSer?: User;
  name = '';
  constructor(
    private userService: UserService,
    private router: Router,
    private accountService: AccountService,
    private uxService: UxService
  ) {}

  ngOnInit() {
    this.loggedInUSer = this.accountService.currentUserValue;
    this.getUsers();
  }
  getUsers() {
    this.userService.getAllUsersStync().subscribe((data) => {
      if (data) {
        this.users = data;
      }
    });
  }
  viewDetails(user: User) {
    this.router.navigate(['/admin/user', user.UserId]);
  }
  deleteUser(user: User) {
    this.uxService.updateUXState({ Loading: true });

    user.StatusId = 99;
    this.userService.updateUserSync(user).subscribe((data) => {
      this.users = this.users.filter((x) => x.UserId !== user.UserId);
      this.uxService.updateUXState({
        Loading: false,
        Toast: {
          Title: 'User Deleted',
          Message: `You deleted this user`,
          Classes: ['_warn'],
        },
      });
    });
  }
}
