import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderModel } from 'src/models/order.model';
import { TaskModel } from 'src/models/task.model';
import { User } from 'src/models/user.model';
import { AccountService } from 'src/services/account.service';
import { EmailService } from 'src/services/email.service';
import { FsrService } from 'src/services/order.service';
import { TaskService } from 'src/services/task.service';
import { UxService } from 'src/services/ux.service';
import { TASK_STATUS } from 'src/utits/constants';
import { emailSig } from 'src/utits/email.helper';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  taskId = 0;
  user?: User;
  task?: TaskModel;
  fsr?: OrderModel;
  TASK_STATUS = TASK_STATUS;
  constructor(
    private accountService: AccountService,
    private activatedRoute: ActivatedRoute,
    private fsrService: FsrService,
    private uxService: UxService,
    private router: Router,
    private emailService: EmailService,
    private taskService: TaskService
  ) {
    this.activatedRoute.params.subscribe((r) => {
      this.user = this.accountService.currentUserValue;
      let id = r['id'];
      if (id) this.taskId = Number(id);
      if (this.taskId) this.getTask();
    });
  }
  getTask() {
    this.taskService.get(this.taskId).subscribe((data) => {
      this.task = data;
    });
  }

  ngOnInit(): void {
    
  }

  save() {
    if (!this.task) return;
    this.taskService.save(this.task).subscribe((data) => {
      console.log(data);
    });
  }
  goToOrder(order: OrderModel){
    this.router.navigate([`/admin/fsr`, order.OrdersId]);

  }

  
  goAhead() {
    if (!this.task) return;
    if (this.task.Status === TASK_STATUS.WaitingForQoute) {
      this.task.Status = TASK_STATUS.QouteDone;
      const timeline = this.taskService.initTimeLine(this.task.TimeLines.length);
      timeline.FinishDateTime = timeline.StarDateTime;
      timeline.FinishReason = `${this.user?.Name || 'Admin'}  confirmed quote`;
      timeline.FinishStatus = TASK_STATUS.QouteDone;
      timeline.StartStatus = TASK_STATUS.WaitingForQoute;
      this.task.TimeLines.push(timeline)
      this.uxService.updateUXState({ Loading: true });
      this.taskService.save(this.task).subscribe((r) => {
        if (r && r.TaskId) {
          this.uxService.updateUXState({
            Loading: false,
            Toast: {
              Title: 'Qoute Done',
              Message: `Now the task can resume`,
              Classes: ['_success'],
            },
          });
          this.task = r;
          // this.onLoad();
          if (this.task?.Assigned) this.sendAssignedEmail(this.task.Assigned);
          if (this.task?.Assigned2) this.sendAssignedEmail(this.task.Assigned2);
        }
      });
    }
  }
  sendAssignedEmail(to: User) {
    if (!to) return;
    let mail = to.Email;
    if (to.AddressUrlWork && to.AddressUrlWork.includes('@')) {
      mail += `,${to.AddressUrlWork}`;
    }
    this.emailService.sendQuickEmail(
      `  <div style="font-family: Arial, Helvetica, sans-serif; padding: 20px; ">
      Hi ${to.Name}  <br>

       ${this.user?.Name} gave you a go ahead on ${this.task?.Name}. <br>

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
