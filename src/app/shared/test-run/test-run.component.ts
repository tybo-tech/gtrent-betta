import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Email } from 'src/models/email.model';
import { OrderModel } from 'src/models/order.model';
import { TaskModel, TimeLineModel } from 'src/models/task.model';
import { User } from 'src/models/user.model';
import { SERVICE_STATUS } from 'src/models/utits';
import { EmailService } from 'src/services/email.service';
import { TaskService } from 'src/services/task.service';
import { UxService } from 'src/services/ux.service';
import { COMPANY_EMIAL, TASK_STATUS } from 'src/utits/constants';
import { getAdminQouteEmail } from 'src/utits/email.helper';
import { appendMoreEmailInfo, formatEmail } from '../helpers/task.helper';

@Component({
  selector: 'app-test-run',
  templateUrl: './test-run.component.html',
  styleUrls: ['./test-run.component.scss'],
})
export class TestRunComponent implements OnInit {
  @Input() task?: TaskModel;
  @Input() user?: User;
  timeLine?: TimeLineModel;

  @Output() onSave = new EventEmitter<any>();
  emailAdmin: string = '';
  constructor(
    private uxService: UxService,
    private emailService: EmailService,
    private taskService: TaskService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.task) this.selectTimeline();
  }
  save = () => {
    if (!this.task?.Fsr) return;
    this.onSave.emit(this.task.Fsr);
    this.onStop();
    this.pauseTask();
  };

  // sendEmail() {
  //   if (!this.user || !this.task || !this.task) return;
  //   const emailToSend: Email = {
  //     FromEmail: 'services@gtrent.co.za',
  //     FromName: 'Gtrent App',
  //     FromPhone: '',
  //     ToEmail: COMPANY_EMIAL,
  //     ToName: 'Admin',
  //     Subject: 'Workshop FSR Qoute',
  //     Message: appendMoreEmailInfo(this.user, this.task),
  //   };
  //   emailToSend.Message = formatEmail(emailToSend);
  //   this.uxService.updateUXState({ Loading: true });
  //   this.emailService
  //     .sendGeneralTextEmail(emailToSend)
  //     .subscribe((response) => {
  //       if (response > 0) {
  //         this.uxService.updateUXState({
  //           Loading: false,
  //           Toast: {
  //             Title: 'Message sent!',
  //             Message: 'Fsr sent to the office for a qoute',
  //             Classes: ['_success'],
  //           },
  //         });
  //         // this.router.navigate(['/']);
  //         //Thank you for contacting us we will reply as soon as possible
  //       }
  //     });
  // }


  
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

  onStop() {
    if (!this.task?.Fsr) return;
    // this.save();
    this.emailAdmin = getAdminQouteEmail(this.task);
    if (this.emailAdmin)
      this.sendEmail(
        this.emailAdmin,
        'Workshop FSR Qoute',
        COMPANY_EMIAL,
        'Admin'
      );
    this.router.navigate(['/technician']);
  }


  
  pauseTask() {
    if (!this.task || !this.timeLine) return;
    if (
      this.task.Status === TASK_STATUS.RunningTest ||
      this.task.Status === TASK_STATUS.RunningTestPaused
    ) {
      this.task.Status = TASK_STATUS.WaitingForQoute;
      this.selectTimeline();
      this.timeLine.FinishReason = 'Sent for a qoute';
      this.timeLine.FinishStatus = TASK_STATUS.WaitingForQoute;
      this.timeLine.FinishDateTime = `${new Date()}`;
      this.uxService.updateUXState({ Loading: true });
      this.taskService.save(this.task).subscribe((r) => {
        if (r && r.TaskId) {
          this.uxService.updateUXState({
            Loading: false,
            Toast: {
              Title: 'Task Paused',
              Message: `Reason: ${this.timeLine?.FinishReason}`,
              Classes: ['_warn'],
            },
          });
          this.task = r;
          this.router.navigate(['/technician/test-success', this.task?.TaskId]);
          // this.onLoad();
        }
      });
    }
  }

  selectTimeline() {
    if (!this.task) return;
    if (!this.task.TimeLines.length) return;

    this.timeLine = this.task.TimeLines[this.task.TimeLines.length - 1];
  }
}
