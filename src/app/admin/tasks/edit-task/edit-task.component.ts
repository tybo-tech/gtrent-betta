import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss'],
})
export class EditTaskComponent implements OnInit {
  task?: TaskModel;
  user?: User;
  showCustomer = false;
  showMachines = false;
  users: User[] = [];
  customerName = '';
  machineName = '';
  customer?: Customer;
  customers: CustomerSammaryModel[] = [];
  TASK_TYPES_LIST = TASK_TYPES_LIST;
  count: string = '';
  taskId = 0;
  //Customers
  constructor(
    private taskService: TaskService,
    private userService: UserService,
    private customerService: CustomerService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private uxService: UxService,

    private accountService: AccountService
  ) {
    this.activatedRoute.params.subscribe((r) => {
      this.user = this.accountService.currentUserValue;
      this.taskId = r['id'];
      if (this.taskId) this.getTask();
    });
  }

  ngOnInit(): void {
    this.accountService.user.subscribe((data) => {
      this.user = data;
    });

    this.customerService.customersListObservable.subscribe((data) => {
      if (data?.length) this.customers = data;
    });

    this.userService.userListObservable.subscribe((data) => {
      if (data?.length) this.users = data;
    });
  }
  getTask() {
    this.uxService.updateUXState({ Loading: true });
    this.taskService.get(this.taskId).subscribe((data) => {
      this.task = data;
      if (this.task && this.task.Customer) {
        this.customerName = this.task.Customer.Name;
        this.customer = this.task.Customer;
      }
      if (this.task.Machine) {
        this.machineName =
          this.task.Machine.Model + ' ' + this.task.Machine.Serial;
      }
      this.uxService.updateUXState({ Loading: false });
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
          Title: 'Task Updated',
          Message: `Task updated succesfully`,
          Classes: ['_success'],
        },
      });
      this.router.navigate(['/admin/tasks']);
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
    } else {
      this.showCustomer = false;
    }
  }

  machineSelectEvent(machine: Machine) {
    if (machine && this.task) {
      this.task.ComprossorId = machine.MachineId;
      this.showMachines = false;
      this.machineName = machine.Model + ' ' + machine.Serial;
    } else {
      this.showMachines = false;
    }
  }
}
