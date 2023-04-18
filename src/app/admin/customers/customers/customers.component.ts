import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/models/customer.model';
import { CustomerSammaryModel } from 'src/models/customer.sammary.model';
import { ListItemEventModel, ListItemModel } from 'src/models/shared.model';
import { User } from 'src/models/user.model';
import { AccountService } from 'src/services/account.service';
import { CustomerService } from 'src/services/customer.service';
import { UxService } from 'src/services/ux.service';
import { CONSTANTS } from 'src/utits/constants';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent implements OnInit,AfterViewInit {
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
   this.user= this.accountService.currentUserValue;

  }
load(){
  this.uxService.updateUXState({ Loading: true });

  if(this.user){
    this.customerService.getCustomers(this.user.CompanyId, CONSTANTS.Cusomer);
  }
  this.customerService.customersListObservable.subscribe((data) => {
    if (data?.length) {
      this.customers = data;
      this.uxService.updateUXState({ Loading: false });

      this.mapItems();
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
  mapItems() {
    this.customers.forEach((___customer) => {
      this.items.push({
        Id: ___customer.CustomerId + '',
        Col1: {
          Id: '',
          Value: ___customer.Name,
          Type: 'text',
          ShowOptions: false,
          Editing: false,
          Classes: [],
        },
        Col2: {
          Id: '',
          Value: ___customer.Machines || '0',
          Type: 'text',
          ShowOptions: false,
          Editing: false,
          Classes: [],
        },
        Col3: {
          Id: '',
          Value: ___customer.FsrCount || '0',
          Type: 'text',
          ShowOptions: false,
          Editing: false,
          Classes: [],
        },
        Col4: {
          Id: ___customer.CustomerId || '',
          Value: 'View details',
          Type: 'action',
          ShowOptions: false,
          Editing: false,
          Classes: ['link-success'],
        },
        Classes: [],
        ShowId: false,
      });
    });
  }

  select(customer: CustomerSammaryModel) {
    this.router.navigate([`/admin/customer`, customer.CustomerId]);
  }
  pushCustomer(c: Customer) {
    // this.query = c.Name;
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
    this.router.navigate([`/admin/customer`, c.CustomerId]);

  }
}
