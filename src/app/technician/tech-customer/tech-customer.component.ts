import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Customer } from 'src/models/customer.model';
import { Machine } from 'src/models/machine.model';
import { TaskModel } from 'src/models/task.model';
import { CustomerService } from 'src/services/customer.service';

@Component({
  selector: 'app-tech-customer',
  templateUrl: './tech-customer.component.html',
  styleUrls: ['./tech-customer.component.scss']
})
export class TechCustomerComponent implements OnInit {
  @Input() customer?: Customer;
  @Input() machine?: Machine;
  @Input() task?: TaskModel;
  @Output() customerEvent: EventEmitter<Customer> = new EventEmitter<Customer>();

  currentCompressor?: Machine;
  showAdd = '';
  customerId = '';
  editCustomer = false;
  constructor(
    private customerService: CustomerService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((r) => {
      this.customerId = r['id'];
    });
  }

  ngOnInit(): void {
    this.getCustomer()
  }
  selectCompressor(c: Machine) {
    this.currentCompressor = c;
  }
  getCustomer() {
    this.customerService.getCustomer(this.customerId);
    this.customerService.userObservable.subscribe((customer) => {
      if (customer) {
        this.customer = customer;
      }
    });
  }

  customerDone(c: Customer){
    if(c && this.customer){
      this.customer.Name = c.Name;
      this.customer.PhoneNumber = c.PhoneNumber;
      this.customer.Email = c.Email;
      this.customer.Surname = c.Surname;
    }
  }
  doneEvent(c: Machine) {
    if (!c || !this.customer) return;
    const check = this.customer?.Machines?.find(
      (x) => x.MachineId === c.MachineId
    );
    if (check) {
      check.Model = c.Model;
      check.Hours = c.Hours;
      check.Serial = c.Serial;
    } else {
      if (this.customer && !this.customer.Machines) this.customer.Machines = [];
      this.customer.Machines?.push(c);
    }
  }
  close(){
    this.customerEvent.emit(this.customer)
  }
}
