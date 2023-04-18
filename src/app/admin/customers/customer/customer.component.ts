import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/models/customer.model';
import { TabModel } from 'src/models/shared.model';
import { CustomerService } from 'src/services/customer.service';
import { UxService } from 'src/services/ux.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent implements OnInit {
  customerId = '';
  customer?: Customer;
  editCustomer = false;
  confirmDelete = false;
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
    private uxService: UxService,
    private router: Router,
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

  customerDone(c: Customer) {
    if (c && this.customer) {
      this.customer.Name = c.Name;
      this.customer.PhoneNumber = c.PhoneNumber;
      this.customer.Email = c.Email;
      this.customer.Surname = c.Surname;
      this.editCustomer = false;
    }
  }

  save() {
    if (!this.customer) return;
    this.uxService.updateUXState({ Loading: true });
    this.customerService.updateCustomerSync(this.customer).subscribe((data) => {
      this.uxService.updateUXState({
        Loading: false,
        Toast: {
          Title: 'Success',
          Classes: ['_success'],
          Message: 'Customer deleted succesfully',
        },
      });
    setTimeout(() => {
      this.router.navigate(['/admin/customers']);
    }, 3000);
    });
  }
}
