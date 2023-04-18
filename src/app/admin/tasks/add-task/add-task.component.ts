import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Customer } from 'src/models/customer.model';
import { CustomerSammaryModel } from 'src/models/customer.sammary.model';
import { Email } from 'src/models/email.model';
import { Machine } from 'src/models/machine.model';
import { TaskModel } from 'src/models/task.model';
import { User } from 'src/models/user.model';

import { AccountService } from 'src/services/account.service';
import { CustomerService } from 'src/services/customer.service';
import { EmailService } from 'src/services/email.service';
import { TaskService } from 'src/services/task.service';
import { UserService } from 'src/services/user.service';
import { UxService } from 'src/services/ux.service';
import {
  COMPANY_EMIAL,
  CONSTANTS,
  TASK_TYPES,
  TASK_TYPES_LIST,
} from 'src/utits/constants';
import { emailSig, formatEmail, getConfirmationEmail } from 'src/utits/email.helper';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit {
  task?: TaskModel;
  user?: User;
  showCustomer = false;
  showMachines = false;
  sendConfirmation = false;
  editCustomer = false;
  users: User[] = [];
  customerName = '';
  machineName = '';
  customers: CustomerSammaryModel[] = [];
  customer?: Customer;
  TASK_TYPES_LIST = TASK_TYPES_LIST;
  TASK_TYPES = TASK_TYPES;
  count: string = '';
  machine: Machine | undefined;
  //Customers
  constructor(
    private taskService: TaskService,
    private userService: UserService,
    private customerService: CustomerService,
    private router: Router,
    private uxService: UxService,
    private emailService: EmailService,

    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.accountService.user.subscribe((data) => {
      this.user = data;
    });

    this.task = this.taskService.initTask();
    this.task.CreatedBy = this.user?.UserId + '';
    this.taskService.list().subscribe((data) => {
      if (data && this.task) this.task.Name = `Task ${data.length + 1}`;
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
          Title: 'Task Created',
          Message: `Task created succesfully`,
          Classes: ['_success'],
        },
      });
      if(this.sendConfirmation){
        this.sendConfirm();
      }
      if (data?.Assigned) this.sendAssignedEmail(data.Assigned);
      if (data?.Assigned2) this.sendAssignedEmail(data.Assigned2);
      
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
      this.machine = machine;
    } else {
      this.showMachines = false;
    }
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

  sendConfirm() {
    if (!this.task?.Fsr || !this.user || !this.customer || !this.machine) return;
    // this.save();
    this.task.Machine = this.machine;
    const email = getConfirmationEmail(this.task, this.user, this.customer);
    if (email)
      this.sendEmail(
        email,
        'FSR confirmation ',
        COMPANY_EMIAL,
        'Admin'
      );
  }
  sendEmail(
    emailCustomer: string,
    subject: string,
    toMail: string,
    toName: string
  ) {
    if (!this.user || !this.task) return;
    const emailToSend: Email = {
      FromEmail: 'services@gtrent.co.za',
      FromName: 'Gtrent App',
      FromPhone: '',
      ToEmail: `${COMPANY_EMIAL},${toMail}`,
      ToName: toName,
      Subject: subject,
      Message: emailCustomer || '',
    };
    emailToSend.Message = formatEmail(emailToSend);
    this.uxService.updateUXState({ Loading: true });
    this.emailService
      .sendGeneralTextEmail(emailToSend)
      .subscribe((response) => {
        if (response > 0) {
          this.uxService.updateUXState({
            Loading: false,
          });
        }
      });
  }

  sendAssignedEmail(to: User){
    if (!to) return;
    let mail = to.Email;
    if(to.AddressUrlWork && to.AddressUrlWork.includes('@')){
      mail+=`,${to.AddressUrlWork}`
    }
    this.emailService.sendQuickEmail(
      `  <div style="font-family: Arial, Helvetica, sans-serif; padding: 20px; ">
      Hi ${to.Name}  <br>

      A task has been assigned to you. <br>

      <a
      href="https://gtrentapp.tybo.co.za/technician"
      target="_blank"
      style="
        background: black;
        color: white;
        padding: 0.5rem 1.5rem;
        border: none;
        display: block;
        width: fit-content;
        margin-top: 2rem;
        font-size: 9px;
        border-radius: 5px;
      "
      >Go to my dashboard</a
    >
    ${emailSig()}
      </div>
      `,
      mail,
      to.Name,
      'Gtrent: Task Assigned to you'
    );
  }
}
