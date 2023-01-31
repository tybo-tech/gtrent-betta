import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Customer, initCustomer } from 'src/models/customer.model';
import { TabModel } from 'src/models/shared.model';
import { CustomerService } from 'src/services/customer.service';
import { UxService } from 'src/services/ux.service';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent implements OnInit {

  customerId = '';
  customer?: Customer;
  constructor(
    private customerService: CustomerService,
    private activatedRoute: ActivatedRoute,
    private uxService: UxService,
  ) {
    this.activatedRoute.params.subscribe((r) => {
      this.customerId = r['id'];
    });
  }

  ngOnInit(): void {
    this.getCustomer();
  }
  getCustomer() {
    if (this.customerId === 'add') {
     this.customer = initCustomer()
      return;
    }
    this.customerService.getCustomer(this.customerId);
    this.customerService.userObservable.subscribe((customer) => {
      if (customer) {
        this.customer = customer;
      }
    });
  }
  onImageChangedEvent(url: string) {
    if (this.customer) this.customer.Dp = url;
  }

  save() {
    if (!this.customer) return;
    if (this.customerId === 'add') {
      this.addNewUser();
      return;
    }
    this.uxService.updateUXState({ Loading: true });
    this.customerService.updateCustomerSync(this.customer).subscribe((data) => {
      this.customer = data;
      this.uxService.updateUXState({
        Loading: false,
        Toast: {
          Title: 'Success',
          Classes: ['_success'],
          Message: 'customer info saved',
        },
      });
    });
  }
  addNewUser() {
    if (!this.customer) return;
    this.uxService.updateUXState({ Loading: true });
    this.customerService.add(this.customer).subscribe((data) => {
      this.customer = data;
      this.uxService.updateUXState({
        Loading: false,
        Toast: {
          Title: 'Success',
          Classes: ['_success'],
          Message: 'customer info saved',
        },
      });
    });
  }
}
