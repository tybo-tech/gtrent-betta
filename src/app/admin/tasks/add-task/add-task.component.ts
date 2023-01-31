import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Customer } from 'src/models/customer.model';
import { CustomerSammaryModel } from 'src/models/customer.sammary.model';
import { TaskModel } from 'src/models/task.model';
import { User } from 'src/models/user.model';

import { AccountService } from 'src/services/account.service';
import { CustomerService } from 'src/services/customer.service';
import { TaskService } from 'src/services/task.service';
import { UserService } from 'src/services/user.service';
import { UxService } from 'src/services/ux.service';
import { CONSTANTS, TASK_TYPES_LIST } from 'src/utits/constants';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit {
  task?: TaskModel;
  user?: User;
  users: User[] = [];
  customers: CustomerSammaryModel[] = [];
  customer?: Customer;
  TASK_TYPES_LIST = TASK_TYPES_LIST;
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
          Title: 'Task Created',
          Message: `Task created succesfully`,
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
}
