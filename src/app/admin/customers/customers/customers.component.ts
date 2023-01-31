import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/models/customer.model';
import { CustomerSammaryModel } from 'src/models/customer.sammary.model';
import { ListItemEventModel, ListItemModel } from 'src/models/shared.model';
import { User } from 'src/models/user.model';
import { AccountService } from 'src/services/account.service';
import { CustomerService } from 'src/services/customer.service';
import { CONSTANTS } from 'src/utits/constants';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent implements OnInit {
  customers: CustomerSammaryModel[] = [];
  items: ListItemModel[] = [];
  grid = { 'grid-template-columns': '30% 30% 30% auto' };
  headers = ['Name', 'Compressors', 'FSRs', 'Actions'];
  query = '';
  constructor(
    private customerService: CustomerService,
    private accountService: AccountService,
    private router: Router
  ) {}

  ngOnInit(): void {
    let user: User | undefined = this.accountService.currentUserValue;
    if(user){
      this.customerService.getCustomers(user.CompanyId, CONSTANTS.Cusomer);
    }
    this.customerService.customersListObservable.subscribe((data) => {
      if (data?.length) {
        this.customers = data;
        this.mapItems();
      }
    });
  }
  mapItems() {
    this.customers.forEach((task) => {
      this.items.push({
        Id: task.CustomerId + '',
        Col1: {
          Id: '',
          Value: task.Name,
          Type: 'text',
          ShowOptions: false,
          Editing: false,
          Classes: [],
        },
        Col2: {
          Id: '',
          Value: task.Machines || '0',
          Type: 'text',
          ShowOptions: false,
          Editing: false,
          Classes: [],
        },
        Col3: {
          Id: '',
          Value: task.FsrCount || '0',
          Type: 'text',
          ShowOptions: false,
          Editing: false,
          Classes: [],
        },
        Col4: {
          Id: task.CustomerId || '',
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

  rowEvent(event: ListItemEventModel) {
    console.log('Full event', event);
    this.router.navigate([`/admin/customer`, event.Value.Id]);
  }
}
