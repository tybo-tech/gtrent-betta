import { Component, Input, OnInit } from '@angular/core';
import { Customer } from 'src/models/customer.model';
import { CustomerSammaryModel } from 'src/models/customer.sammary.model';
import { TaskModel } from 'src/models/task.model';
import { User } from 'src/models/user.model';
import { CustomerService } from 'src/services/customer.service';
import { EmailService } from 'src/services/email.service';
import { TaskService } from 'src/services/task.service';
import { UserService } from 'src/services/user.service';
import { UxService } from 'src/services/ux.service';
import { emailSig } from 'src/utits/email.helper';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss'],
})
export class TaskDetailsComponent implements OnInit {
  @Input() task?: TaskModel;
  @Input() disableAssign = false;
  users: User[] = [];
  editInstructions = false;

  userId = '';
  constructor(
    private userService: UserService,
    private taskService: TaskService,
    private uxService: UxService,
    private emailService: EmailService,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.userService.userListObservable.subscribe((data) => {
      if (data?.length) this.users = data;
      // this.users = data.filter((x) => x.UserType === 'Technician');
    });
  }

  userChaged() {
    if (this.task && this.users?.length) {
      this.task.Assigned = this.users.find(
        (x) => x.UserId === this.task?.AssignedTo
      );
      this.uxService.updateUXState({
        Loading: true,
      });
      if (this.task.Assigned) this.sendAssignedEmail(this.task.Assigned)
      this.save();
    }
  }

  user2Chaged() {
    if (this.task && this.users?.length) {
      this.task.Assigned2 = this.users.find(
        (x) => x.UserId === this.task?.AssignedTo
      );
      this.uxService.updateUXState({
        Loading: true,
      });
      if (this.task.Assigned2) this.sendAssignedEmail(this.task.Assigned2)
      this.save();
    }
  }

  save() {
    if (this.task) {
      this.uxService.updateUXState({
        Loading: true,
      });
      this.taskService.save(this.task).subscribe((data) => {
        this.uxService.updateUXState({
          Loading: false,
          Toast: {
            Title: 'Task updated',
            Message: ``,
            Classes: ['_success'],
          },
        });
      });
    }
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
