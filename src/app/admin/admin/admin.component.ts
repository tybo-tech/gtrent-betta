import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user.model';
import { AccountService } from 'src/services/account.service';
import { CustomerService } from 'src/services/customer.service';
import { UserService } from 'src/services/user.service';
import { CONSTANTS } from 'src/utits/constants';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(
    private customerService: CustomerService,
    private accountService: AccountService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    let user: User | undefined = this.accountService.currentUserValue;
    if(user){
      this.customerService.getCustomers(user.CompanyId, CONSTANTS.Cusomer);
    }
    this.userService.getAllUsers();
  }

}
