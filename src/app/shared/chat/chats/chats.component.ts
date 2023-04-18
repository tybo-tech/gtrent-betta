import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from 'src/models/item.model';
import { User } from 'src/models/user.model';
import { AccountService } from 'src/services/account.service';
import { ItemService } from 'src/services/item.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss'],
})
export class ChatsComponent implements OnInit {
  type = 'Chat';
  user?: User;
  chats: Item[] = [];
  users: User[] = [];

  constructor(
    private itemService: ItemService,
    private accountService: AccountService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.accountService.user.subscribe((data) => {
      this.user = data;
      if (this.user) {
        this.getUsers();
        setInterval(() => {
          this.getUsers();
        }, 5000);
      }
    });
  }
  getUsers() {
    this.userService.getAllUsersStync(this.user?.UserId || '').subscribe((data) => {
      if (data) {
        data.forEach((item) => {
          if (item.Chats?.length) {
            item.LastChat = item.Chats[item.Chats.length - 1];
          }
        });
        this.users = data.filter((x) => x.UserId !== this.user?.UserId);
        // this.getItems();
      }
    });
  }
  // getItems() {
  //   this.itemService
  //     .getItems(this.user?.UserId + '', this.type, false)
  //     .subscribe((data) => {
  //       this.chats = data;
  //       if (this.users.length) {
  //       }
  //     });
  // }
  chat(user: User) {
    if (this.user?.UserType === 'Admin')
      this.router.navigate(['/admin/chats', user.UserId]);
    else this.router.navigate(['/technician/chats', user.UserId]);
  }
}
