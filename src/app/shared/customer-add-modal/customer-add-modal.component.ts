import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer, initCustomer } from 'src/models/customer.model';
import { CustomerService } from 'src/services/customer.service';
import { UxService } from 'src/services/ux.service';

@Component({
  selector: 'app-customer-add-modal',
  templateUrl: './customer-add-modal.component.html',
  styleUrls: ['./customer-add-modal.component.scss']
})
export class CustomerAddModalComponent implements OnInit {

 @Input() customerId = '';
 @Input() q = '';
 @Output() addEvent = new EventEmitter<Customer>();
 @Output() closeEvent = new EventEmitter<any>();

  backTo = '';
  label1 = 'Edit Customer';
  label = 'Customers';
  customer?: Customer;
  constructor(
    private customerService: CustomerService,
    private router: Router,
    private uxService: UxService
  ) {
    // this.activatedRoute.params.subscribe((r) => {
    //   this.customerId = r['id'];
    //   this.backTo = r['backTo'];
    //   if (this.backTo === 'view') this.label = 'Customer Dashboard';
    //   if (this.customerId === 'add') this.label1 = 'Add new customer';
    // });
  }

  ngOnInit(): void {
    this.getCustomer();
  }
  getCustomer() {
    if (this.customerId === 'add') {
      this.customer = initCustomer();
      if(this.q) this.customer.Name = this.q;
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
      this.addEvent.emit(data)
    });
  }
  back() {
    this.closeEvent.emit()
  }

}
