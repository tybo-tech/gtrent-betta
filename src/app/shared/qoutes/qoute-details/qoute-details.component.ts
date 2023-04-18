import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Customer } from 'src/models/customer.model';
import { Email } from 'src/models/email.model';
import { TaskModel, TimeLineModel } from 'src/models/task.model';
import { User } from 'src/models/user.model';
import { AccountService } from 'src/services/account.service';
import { EmailService } from 'src/services/email.service';
import { TaskService } from 'src/services/task.service';
import { UxService } from 'src/services/ux.service';
import { TASK_TYPES, TASK_STATUS, TIMELINE_STATUS, COMPANY_EMIAL } from 'src/utits/constants';
import { formatEmail, getAdminEmail, getQouteEmail, sendEmailToCustomer } from 'src/utits/email.helper';

@Component({
  selector: 'app-qoute-details',
  templateUrl: './qoute-details.component.html',
  styleUrls: ['./qoute-details.component.scss']
})
export class QouteDetailsComponent implements OnInit {
  user?: User;
  taskId = 0;
  editWorkDone = false;
  editReference = false;
  editConsumables = false;
  editLabour = false;
  editDistanceTravelled = false;
  selectParts = false;
  customerSigniture = false;
  showImages = false;
  technicainSigniture = false;
  totalPartsUsed = 0;
  TASK_TYPES = TASK_TYPES;
  TASK_STATUS = TASK_STATUS;
  TIMELINE_STATUS = TIMELINE_STATUS;
  emailAdmin?: string;
  task?: TaskModel;
  // timeLine?: TimeLineModel;
  showConfirmStop: boolean = false;
  editCustomer: boolean = false;

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
        // this.sendAdminEmail();

        // if(this.task){
        //   this.emailCustomer = sendEmailToCustomer(this.task);
        //   if (this.emailCustomer && this.task.Customer?.Email && !this.isWorkShopFsr)
        //     this.sendEmail(
        //       this.emailCustomer,
        //       'FSR Summary report for customer',
        //       this.task.Customer.Email,
        //       this.task.Customer.Name
        //     );
        // }
      }
    });
  }
  sendAdminEmail() {
    if (this.task) this.emailAdmin = getAdminEmail(this.task);
    if (this.emailAdmin)
      this.sendEmail(
        this.emailAdmin,
        'FSR Summary report for admin',
        COMPANY_EMIAL,
        'Admin'
      );
  }
  afterLoad(data: TaskModel) {
    this.task = data;
    this.totalPartsUsed = 0;
    this.task.Fsr.PartsUsed.forEach((o) => {
      this.totalPartsUsed += Number(o.Quantity);
    });
  }
  partsEvent(e: any) {
    if (this.task) {
      this.totalPartsUsed = 0;
      this.task.Fsr.PartsUsed = e;
      this.task.Fsr.PartsUsed.forEach((o) => {
        this.totalPartsUsed += Number(o.Quantity);
      });
    }
  }
  ngOnInit(): void {}

  openCustomerMenu() {}

 

  customerEvent(c: Customer) {
    if (c && this.task) {
      this.task.Customer = c;
      this.editCustomer = false;
    }
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

 
  imageChangedEvent(e: string) {
    if (this.task) {
      if (!this.task.Loaction) this.task.Loaction = [];
      this.task.Loaction.push(e);
      this.save();
    }
  }
  saveQoute() {
    if (!this.task ) return;
    this.task.Status = 'Qouted';
    this.uxService.updateUXState({ Loading: true });
    this.taskService.save(this.task).subscribe((r) => {
      if (r && r.TaskId) {
        this.uxService.updateUXState({
          Loading: false,
          Toast: {
            Title: 'Qoute Save',
            Message: `Email sent to admin`,
            Classes: ['_success'],
          },
        });
        this.task = r;
        this.onStop();
        this.router.navigate(['/technician/task-complited', this.task.TaskId, 'qoute']);

      }
    });
  }

  onStop() {
    if (!this.task?.Fsr || !this.user) return;
    // this.save();
    this.emailAdmin = getQouteEmail(this.task, this.user);
    if (this.emailAdmin)
      this.sendEmail(
        this.emailAdmin,
        'New quote for '+ this.task.Customer?.Name,
        COMPANY_EMIAL,
        'Admin'
      );
    this.router.navigate(['/technician']);
  }
}
