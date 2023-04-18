import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Customer } from 'src/models/customer.model';
import { Machine } from 'src/models/machine.model';
import { TaskModel } from 'src/models/task.model';

@Component({
  selector: 'app-task-customer',
  templateUrl: './task-customer.component.html',
  styleUrls: ['./task-customer.component.scss'],
})
export class TaskCustomerComponent implements OnInit {
  @Input() customer?: Customer;
  @Input() machine?: Machine;
  @Input() task?: TaskModel;
  @Output() customerEvent: EventEmitter<Customer> = new EventEmitter<Customer>();

  currentCompressor?: Machine;
  showAdd = '';
  editCustomer = false;
  constructor() {}

  ngOnInit(): void {}
  selectCompressor(c: Machine) {
    this.currentCompressor = c;
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
