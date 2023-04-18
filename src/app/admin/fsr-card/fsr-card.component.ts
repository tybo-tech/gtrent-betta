import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Customer } from 'src/models/customer.model';
import { CustomerSammaryModel } from 'src/models/customer.sammary.model';
import { Machine } from 'src/models/machine.model';
import { OrderModel } from 'src/models/order.model';
import { FsrModel, TaskModel } from 'src/models/task.model';
import { CustomerService } from 'src/services/customer.service';

@Component({
  selector: 'app-fsr-card',
  templateUrl: './fsr-card.component.html',
  styleUrls: ['./fsr-card.component.scss'],
})
export class FsrCardComponent implements OnInit {
  @Input() task?: TaskModel;
  @Input() totalPartsUsed: number = 0;
  @Output() onSave = new EventEmitter<TaskModel>();
  showImages = false;
  showMachines = false;
  showCustomer = false;
  customerName = '';
  machineName = '';
  customer?: Customer;
  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    if (this.task && this.task.Fsr.PartsUsed) {
      this.totalPartsUsed = 0;
      this.task.Fsr.PartsUsed.forEach((part) => {
        this.totalPartsUsed += Number(part.Quantity);
      });
    }
    if(this.task?.CustomerId){
      this.customerService.getCustomerSync(this.task?.CustomerId).subscribe((customer) => {
        if (customer && customer.CustomerId && this.task) {
          this.customerName = customer.Name;
          this.task.Customer = customer;
        }
      });
    }
  }
  loadMatchines() {
    if (!this.task) return;
    this.customerService.getCustomer(this.task.CustomerId);
    this.customerService.userObservable.subscribe((user) => {
      if (user) {
        this.customer = user;
        this.customer.Machines = this.customer.Machines?.filter(
          (x: any) => Number(x.StatusId) === 1
        );
        console.log(this.customer.Machines);
      }
    });
  }

  customerSelectEvent(customer: CustomerSammaryModel) {
    if (customer && this.task) {
      this.task.CustomerId = customer.CustomerId;

      this.loadCustomer(customer.CustomerId);
    } else {
      this.showCustomer = false;
    }
  }

  loadCustomer(id: string) {
    this.customerService.getCustomerSync(id).subscribe((customer) => {
      if (customer && customer.CustomerId && this.task) {
        this.loadMatchines();
        this.showCustomer = false;
        this.customerName = customer.Name;
        this.task.Customer = customer;
        this.task.ComprossorId = '';
        this.task.Machine = undefined;
        this.save();
      }
    });
  }
  machineSelectEvent(machine: Machine) {
    if (machine && this.task) {
      this.task.ComprossorId = machine.MachineId;
      this.showMachines = false;
      this.machineName = machine.Model + ' ' + machine.Serial;
      this.task.Machine = machine;
      this.save();
    } else {
      this.showMachines = false;
    }
  }
  save() {
    if (this.task) this.onSave.emit(this.task);
  }
}
