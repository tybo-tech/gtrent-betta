import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { formatEmail } from 'src/app/shared/helpers/task.helper';
import { Email } from 'src/models/email.model';
import { OrderModel } from 'src/models/order.model';
import { TaskModel, TimeLineModel } from 'src/models/task.model';
import { User } from 'src/models/user.model';
import { AccountService } from 'src/services/account.service';
import { EmailService } from 'src/services/email.service';
import { FsrService } from 'src/services/order.service';
import { TaskService } from 'src/services/task.service';
import { UxService } from 'src/services/ux.service';
import {
  COMPANY_EMIAL,
  FSR_STATUS,
  TASK_STATUS,
  TASK_TYPES,
  TIMELINE_STATUS,
} from 'src/utits/constants';
import { getAdminEmail, sendEmailToCustomer } from 'src/utits/email.helper';

@Component({
  selector: 'app-new-fsr',
  templateUrl: './new-fsr.component.html',
  styleUrls: ['./new-fsr.component.scss'],
})
export class NewFsrComponent implements OnInit {
  user?: User;
  taskId = 0;
  editWorkDone = false;
  editReference = false;
  editConsumables = false;
  editLabour = false;
  editDistanceTravelled = false;
  selectParts = false;
  customerSigniture = false;
  technicainSigniture = false;
  isWorkShopFsr = false;
  totalPartsUsed = 0;
  TASK_TYPES = TASK_TYPES;
  TASK_STATUS = TASK_STATUS;
  TIMELINE_STATUS =TIMELINE_STATUS;
  emailCustomer?: string;
  emailAdmin?: string;
  task?: TaskModel;
  timeLine?: TimeLineModel;
  showConfirmStop: boolean = false;

  constructor(
    private accountService: AccountService,
    private router: Router,
    private taskService: TaskService,
    private activatedRoute: ActivatedRoute,
    private emailService: EmailService,
    private uxService: UxService
  ) {
    this.activatedRoute.params.subscribe((r) => {
      this.user = this.accountService.currentUserValue;
      this.taskId = r['id'];
      if (this.taskId) this.getTask();
    });
  }
  getTask() {
    this.taskService.get(this.taskId).subscribe((data) => {
      if (data && data.TaskId) {
        this.afterLoad(data);
      }
    });
  }
  afterLoad(data: TaskModel) {
    this.task = data;
    if (this.task) this.selectTimeline();

    this.totalPartsUsed = 0;
    this.isWorkShopFsr = this.task.TaskType === TASK_TYPES.WorkshopFSR;
    this.task.Fsr.PartsUsed.forEach((o) => {
      this.totalPartsUsed += Number(o.Quantity);
    });
  }

  ngOnInit(): void {}

  openCustomerMenu() {}

  selectTimeline() {
    if (!this.task) return;
    if (!this.task.TimeLines.length) return;

    this.timeLine = this.task.TimeLines[this.task.TimeLines.length - 1];
  }
  onStop() {
    if (!this.task?.Fsr) return;
    // this.save();
    this.emailCustomer = sendEmailToCustomer(this.task);
    this.emailAdmin = getAdminEmail(this.task);
    if (this.emailCustomer && this.task.Customer?.Email && !this.isWorkShopFsr)
      this.sendEmail(
        this.emailCustomer,
        'FSR Summary report for customer',
        this.task.Customer.Email,
        this.task.Customer.Name
      );
    if (this.emailAdmin)
      this.sendEmail(
        this.emailAdmin,
        'FSR Summary report for admin',
        COMPANY_EMIAL,
        'Admin'
      );

    console.log({ email: this.emailCustomer });
    this.router.navigate(['/technician']);
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
  save() {
    if (!this.task) return;
    this.taskService.save(this.task).subscribe((r) => {
      if (r && r.TaskId) {
        this.afterLoad(r);
      }
    });
  }

  stopTask() {
    if (this.task) this.selectTimeline();
    if (!this.task || !this.timeLine) return;
    this.task.Status = TASK_STATUS.Complete;
    this.timeLine.FinishStatus = TASK_STATUS.Complete;
    this.timeLine.FinishDateTime = `${new Date()}`;
    this.task.FinishDateTime = `${new Date()}`;
    this.uxService.updateUXState({ Loading: true });
    this.taskService.save(this.task).subscribe((r) => {
      if (r && r.TaskId) {
        this.uxService.updateUXState({
          Loading: false,
          Toast: {
            Title: 'Task Completed',
            Message: `Well done on your task`,
            Classes: ['_success'],
          },
        });
        this.task = r;
        this.onStop();
        this.router.navigate(['/technician/task-complited', this.task.TaskId]);
      }
    });
  }
  doneEvent(e: any) {
    if (e) this.stopTask();
    this.showConfirmStop = false;
  }
}
