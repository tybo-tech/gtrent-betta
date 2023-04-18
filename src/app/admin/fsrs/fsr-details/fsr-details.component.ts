import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Email } from 'src/models/email.model';
import { OrderModel } from 'src/models/order.model';
import { TaskModel } from 'src/models/task.model';
import { User } from 'src/models/user.model';
import { AccountService } from 'src/services/account.service';
import { EmailService } from 'src/services/email.service';
import { FsrService } from 'src/services/order.service';
import { TaskService } from 'src/services/task.service';
import { UxService } from 'src/services/ux.service';
import { COMPANY_EMIAL, TASK_STATUS, TASK_TYPES } from 'src/utits/constants';
import { emailSig, formatEmail, sendEmailToCustomer } from 'src/utits/email.helper';
@Component({
  selector: 'app-fsr-details',
  templateUrl: './fsr-details.component.html',
  styleUrls: ['./fsr-details.component.scss'],
})
export class FsrDetailsComponent implements OnInit {
  taskId = 0;
  backTo = '';
  user?: User;
  task?: TaskModel;
  fsr?: OrderModel;
  TASK_STATUS = TASK_STATUS;
  showConfirmSend = false;
  emailCustomer = '';
  isWorkShopFsr = false;

  constructor(
    private accountService: AccountService,
    private activatedRoute: ActivatedRoute,
    private emailService: EmailService,
    private uxService: UxService,
    private router: Router,
    private taskService: TaskService
  ) {
    this.activatedRoute.params.subscribe((r) => {
      this.user = this.accountService.currentUserValue;
      let id = r['id'];
      this.backTo = r['backTo'] || '';
      if (id) this.taskId = Number(id);
      if (this.taskId) this.getTask();
    });
  }
  getTask() {
    this.taskService.get(this.taskId).subscribe((data) => {
      if (data && data.TaskId) {
        this.task = data;
        this.isWorkShopFsr = this.task.TaskType === TASK_TYPES.WorkshopFSR;
      }
    });
  }

  ngOnInit(): void {}

  save() {
    if (!this.task) return;
    this.taskService.save(this.task).subscribe((data) => {
      console.log(data);
    });
  }
  goToOrder(order: OrderModel) {
    this.router.navigate([`/admin/fsr`, order.OrdersId]);
  }

  goAhead() {
    if (!this.task) return;
    if (this.task.Status === TASK_STATUS.WaitingForQoute) {
      this.task.Status = TASK_STATUS.QouteDone;
      const timeline = this.taskService.initTimeLine(
        this.task.TimeLines.length
      );
      timeline.FinishDateTime = timeline.StarDateTime;
      timeline.FinishReason = `${this.user?.Name || 'Admin'}  confirmed quote`;
      timeline.FinishStatus = TASK_STATUS.QouteDone;
      timeline.StartStatus = TASK_STATUS.WaitingForQoute;
      this.task.TimeLines.push(timeline);
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
          if (this.task?.Assigned) this.sendAssignedEmail(this.task.Assigned);
          if (this.task?.Assigned2) this.sendAssignedEmail(this.task.Assigned2);
          // this.onLoad();
        }
      });
    }
  }
  resendCustomerEmail(canSend: boolean) {
    this.showConfirmSend = false;
    if (!canSend) return;
    if (!this.task?.Fsr) return;
    // this.save();
    this.emailCustomer = sendEmailToCustomer(this.task);
    if (this.emailCustomer && this.task.Customer?.Email && !this.isWorkShopFsr)
      this.sendEmail(
        this.emailCustomer,
        'FSR Summary report for customer',
        this.task.Customer.Email,
        this.task.Customer.Name
      );

    console.log({ email: this.emailCustomer });
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
            Toast: {
              Title: 'FSR Resent',
              Message: ``,
              Classes: ['_success'],
            },
          });
        }
      });
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
