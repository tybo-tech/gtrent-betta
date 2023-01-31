import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/models';
import { AccountService } from 'src/services';
import { REPORT_MANAGER } from 'src/shared/constants';

@Component({
  selector: 'app-dashboard-landing',
  templateUrl: './dashboard-landing.component.html',
  styleUrls: ['./dashboard-landing.component.scss']
})
export class DashboardLandingComponent implements OnInit {
  user: User;

  constructor(    private accountService: AccountService,private router: Router
    ) { }

  ngOnInit(): void {
    this.accountService.user.subscribe(data => {
      this.user = data;
      if (!this.user || !this.user.Company) {
        this.router.navigate(['home/sign-in'])
        return
      }
      
      if(this.user && this.user.UserType === REPORT_MANAGER){
        this.router.navigate(['/admin/dashboard/testing-reports'])
      }

    });
  }

}
