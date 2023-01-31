import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Customer } from 'src/models/customer.model';
import { TabModel } from 'src/models/shared.model';
import { CustomerService } from 'src/services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent implements OnInit {
  customerId = '';
  customer?: Customer;
  tabs: TabModel[] = [
    {
      Name: 'Basic info',
      Id: 'basic',
      Classes: ['active'],
    },
    {
      Name: 'Compressors',
      Id: 'compressors',
      Classes: [],
    },
    {
      Name: 'Fsr services',
      Id: 'fsr',
      Classes: [],
    },
    // {
    //   Name: 'Test reports',
    //   Id: 'reports',
    //   Classes: [],
    // },
  ];
  tab: TabModel = this.tabs[0];
  constructor(
    private customerService: CustomerService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((r) => {
      this.customerId = r['id'];
    });
  }

  ngOnInit(): void {
    this.getCustomer();
  }
  getCustomer() {
    this.customerService.getCustomer(this.customerId);
    this.customerService.userObservable.subscribe((customer) => {
      if (customer) {
        this.customer = customer;
      }
    });
  }
}
