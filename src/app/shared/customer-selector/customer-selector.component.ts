import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Customer } from 'src/models/customer.model';
import { CustomerSammaryModel } from 'src/models/customer.sammary.model';
import { User } from 'src/models/user.model';
import { AccountService } from 'src/services/account.service';
import { CustomerService } from 'src/services/customer.service';
import { UxService } from 'src/services/ux.service';
import { CONSTANTS } from 'src/utits/constants';

@Component({
  selector: 'app-customer-selector',
  templateUrl: './customer-selector.component.html',
  styleUrls: ['./customer-selector.component.scss'],
})
export class CustomerSelectorComponent implements OnInit {
  @Input() customerId?: string;
  @Output() doneEvent = new EventEmitter<CustomerSammaryModel>();
  user?: User;
  customers: CustomerSammaryModel[] = [];
  searchString = '';
  addCustomer = '';
  constructor(
    private uxService: UxService,
    private a: AccountService,
    private customerService: CustomerService
  ) {}
  ngOnInit(): void {
    this.user = this.a.currentUserValue;
    if (this.user) this.load();
  }
  select(customer: CustomerSammaryModel) {
    this.doneEvent.emit(customer);
  }
  back() {
    this.doneEvent.emit(undefined);
  }
  pushCustomer(c: Customer) {
    this.searchString = c.Name;
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
    this.searchString = '';
  }
  load() {
    this.uxService.updateUXState({ Loading: true });

    if (this.user) {
      this.customerService.getCustomers(this.user.CompanyId, CONSTANTS.Cusomer);
    }
    this.customerService.customersListObservable.subscribe((data) => {
      if (data?.length) {
        data.map((x) => (x.Selected = false));
        if (this.customerId) {
          const c = data.find((x) => x.CustomerId === this.customerId);
          if (c) c.Selected = true;
        }
        this.customers = data;
        this.uxService.updateUXState({ Loading: false });
      }
    });
  }
}
