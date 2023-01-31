import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { initUser, User } from 'src/models/user.model';
import { AccountService } from 'src/services/account.service';
import { UserService } from 'src/services/user.service';
import { UxService } from 'src/services/ux.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  user?: User;
  showFilter = true;
  items = [];
  loggedInUSer?: User;
  name = '';
  userId: string = '';
  passwordType = 'password';

  constructor(
    private userService: UserService,
    private router: Router,
    private accountService: AccountService,
    private uxService: UxService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((r) => {
      this.userId = r['id'];
      this.getUser();
    });
  }

  ngOnInit() {
    this.loggedInUSer = this.accountService.currentUserValue;
  }
  getUser() {
    if (this.userId === 'add') {
      this.user = initUser();
      return;
    }
    this.userService.getUserSync(this.userId).subscribe((data) => {
      if (data) {
        this.user = data;
      }
    });
  }
  viewDetails(user: User) {
    this.router.navigate(['/admin/user', user.UserId]);
  }
  save() {
    if (!this.user) return;
    if (this.userId === 'add') {
      this.addNewUser();
      return;
    }
    this.uxService.updateUXState({ Loading: true });
    this.userService.updateUserSync(this.user).subscribe((data) => {
      this.user = data;
      this.uxService.updateUXState({
        Loading: false,
        Toast: {
          Title: 'Success',
          Classes: ['_success'],
          Message: 'User info saved',
        },
      });
    });
  }
  addNewUser() {
    if (!this.user) return;
    this.uxService.updateUXState({ Loading: true });
    this.userService.add(this.user).subscribe((data) => {
      this.user = data;
      this.uxService.updateUXState({
        Loading: false,
        Toast: {
          Title: 'Success',
          Classes: ['_success'],
          Message: 'User info saved',
        },
      });
    });
  }
  onImageChangedEvent(url: string) {
    if (this.user) this.user.Dp = url;
  }
}
