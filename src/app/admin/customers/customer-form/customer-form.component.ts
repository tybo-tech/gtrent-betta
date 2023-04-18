import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer, initCustomer } from 'src/models/customer.model';
import { TabModel } from 'src/models/shared.model';
import { CustomerService } from 'src/services/customer.service';
import { UxService } from 'src/services/ux.service';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss'],
})
export class CustomerFormComponent implements OnInit {
  customerId = '';
  backTo = '';
  label1 = 'Edit Customer';
  label = 'Customers';
  customer?: Customer;
  constructor(
    private customerService: CustomerService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private uxService: UxService
  ) {
    this.activatedRoute.params.subscribe((r) => {
      this.customerId = r['id'];
      this.backTo = r['backTo'];
      if (this.backTo === 'view') this.label = 'Customer Dashboard';
      if (this.customerId === 'add') this.label1 = 'Add new customer';
    });
  }

  ngOnInit(): void {
    this.getCustomer();
  }
  getCustomer() {
    if (this.customerId === 'add') {
      this.customer = initCustomer();
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
          Message: 'Customer updated succesfully',
        },
      });
    });
  }
  refresh() {
    this.router.navigate([`/admin/customer-form/${this.customerId}/view`]);
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
          Message: 'Customer created succesfully',
        },
      });
      this.customerId = data.CustomerId || 'add'
      this.refresh();
    });
  }
  back() {
    if (!this.backTo) {
      this.router.navigate(['/admin/customers']);
      return;
    }

    if (this.backTo === 'view') {
      this.router.navigate([`/admin/customer/${this.customerId}`]);
      return;
    }
  }
}
