import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/services/account.service';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.scss'],
})
export class AdminNavComponent implements OnInit {
  constructor(private accountService: AccountService, private router: Router) {}

  ngOnInit(): void {
    const user = this.accountService.currentUserValue;
    if(!user)   this.router.navigate(['/']);
  }
  logout() {
    this.accountService.logout();
    this.router.navigate(['/']);
  }
}
