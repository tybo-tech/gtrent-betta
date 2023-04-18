import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/models/customer.model';
import { CustomerSammaryModel } from 'src/models/customer.sammary.model';
import { Machine } from 'src/models/machine.model';
import { TaskModel } from 'src/models/task.model';
import { User } from 'src/models/user.model';
import { AccountService } from 'src/services/account.service';
import { CustomerService } from 'src/services/customer.service';
import { TaskService } from 'src/services/task.service';
import { UserService } from 'src/services/user.service';
import { UxService } from 'src/services/ux.service';
import { TASK_TYPES_LIST } from 'src/utits/constants';

@Component({
  selector: 'app-qoute',
  templateUrl: './qoute.component.html',
  styleUrls: ['./qoute.component.scss']
})
export class QouteComponent implements OnInit {

  task?: TaskModel;
  user?: User;
  showCustomer = false;
  showMachines = false;
  users: User[] = [];
  customerName = ''
  machineName = ''
  customers: CustomerSammaryModel[] = [];
  customer?: Customer;
  TASK_TYPES_LIST = TASK_TYPES_LIST;
  count: string = '';
  //Customers
  constructor(
    private taskService: TaskService,
    private userService: UserService,
    private customerService: CustomerService,
    private router: Router,
    private uxService: UxService,

    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.accountService.user.subscribe((data) => {
      this.user = data;
    });

    this.task = this.taskService.initTask();
    this.task.TaskType = 'Quote';
    this.task.CreatedBy = this.user?.UserId+'';
    this.taskService.listByType('Quote').subscribe((data) => {
      if (data && this.task) this.task.Name = `Quote ${data.length + 1}`; 
      if (!data && this.task) this.task.Name = `Quote 1`; 
      console.log(this.task);
      
    });

    this.customerService.customersListObservable.subscribe((data) => {
      if (data?.length) this.customers = data;
    });

    this.userService.userListObservable.subscribe((data) => {
      if (data?.length) this.users = data;
    });
  }
  save() {
    if (!this.task) return;
    this.uxService.updateUXState({ Loading: true });
    if (this.task.DueDate.includes('/')) {
      this.task.DueDate = this.task.DueDate.replace('/', '-');
      this.task.DueDate = this.task.DueDate.replace('/', '-');
    }
    this.taskService.save(this.task).subscribe((data) => {
      console.log(data);
      this.uxService.updateUXState({
        Loading: false,
        Toast: {
          Title: 'Quote Created',
          Message: `Quote created succesfully`,
          Classes: ['_success'],
        },
      });
      this.router.navigate(['/technician/qoute-details', data.TaskId]);
    });
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
      this.loadMatchines();
      this.showCustomer = false;
      this.customerName = customer.Name;
    }else{
      this.showCustomer = false;
    }
  }

  machineSelectEvent(machine: Machine) {
    if (machine && this.task) {
      this.task.ComprossorId = machine.MachineId;
      this.showMachines = false;
      this.machineName = machine.Model + ' ' + machine.Serial;
    }else{
      this.showMachines = false;
    }
  }

}
