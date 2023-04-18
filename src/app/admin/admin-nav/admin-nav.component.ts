import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/models/user.model';
import { AccountService } from 'src/services/account.service';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.scss'],
})
export class AdminNavComponent implements OnInit {
  user: User | undefined;
  constructor(private accountService: AccountService, private router: Router) {}

  ngOnInit(): void {
    this.accountService.user.subscribe(data=>{
      this.user = data;
      if(!this.user)   this.router.navigate(['/']);
    })
    this.accountService.refreshOnce();
    this.accountService.refresh();

  }
  logout() {
    this.accountService.logout();
    this.router.navigate(['/']);
  }
}
