import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/models/customer.model';
import { CustomerSammaryModel } from 'src/models/customer.sammary.model';
import { ListItemModel } from 'src/models/shared.model';
import { User } from 'src/models/user.model';
import { AccountService } from 'src/services/account.service';
import { CustomerService } from 'src/services/customer.service';
import { UxService } from 'src/services/ux.service';
import { CONSTANTS } from 'src/utits/constants';

@Component({
  selector: 'app-tech-customer-list',
  templateUrl: './tech-customer-list.component.html',
  styleUrls: ['./tech-customer-list.component.scss'],
})
export class TechCustomerListComponent {
  customers: CustomerSammaryModel[] = [];
  items: ListItemModel[] = [];
  grid = { 'grid-template-columns': '30% 30% 30% auto' };
  headers = ['Name', 'Compressors', 'FSRs', 'Actions'];
  query = '';
  user: User | undefined;
  addCustomer = '';
  constructor(
    private customerService: CustomerService,
    private accountService: AccountService,
    private router: Router,
    private uxService: UxService
  ) {}

  ngOnInit(): void {
    this.user = this.accountService.currentUserValue;
  }
  load() {
    this.uxService.updateUXState({ Loading: true });

    if (this.user) {
      this.customerService.getCustomers(this.user.CompanyId, CONSTANTS.Cusomer);
    }
    this.customerService.customersListObservable.subscribe((data) => {
      if (data?.length) {
        this.customers = data;
        this.uxService.updateUXState({ Loading: false });
      }
    });
  }
  ngAfterViewInit(): void {
    if (this.user) {
      setTimeout(() => {
        this.load();
      }, 1);
    }
  }
open(customer: CustomerSammaryModel){
  this.router.navigate([`/technician/customers`, customer.CustomerId]);

}
  pushCustomer(c: Customer) {
    this.customers.unshift({
      CustomerId: c.CustomerId || '',
      Name: c.Name,
      Email: c.Email,
      Dp: c.Dp,
      PhoneNumber: c.PhoneNumber,
      StatusId: c.StatusId,
      Machines: '',
      FsrCount: '0',
      Selected: false,
    });
    // this.query = '';
    this.router.navigate([`/technician/customers`, c.CustomerId]);
  }
}
