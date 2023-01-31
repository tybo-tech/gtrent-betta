import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderModel } from 'src/models/order.model';
import { TaskModel } from 'src/models/task.model';
import { User } from 'src/models/user.model';
import { AccountService } from 'src/services/account.service';
import { FsrService } from 'src/services/order.service';
import { TaskService } from 'src/services/task.service';
import { UxService } from 'src/services/ux.service';
import { TASK_STATUS } from 'src/utits/constants';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss'],
})
export class TaskModalComponent implements OnInit {
  @Input() task?: TaskModel;
  TASK_STATUS = TASK_STATUS;
  @Output() closeEvent = new EventEmitter<any>();

  taskId = 0;
  user?: User;
  fsr?: OrderModel;
  constructor(
    private accountService: AccountService,
    private activatedRoute: ActivatedRoute,
    private fsrService: FsrService,
    private uxService: UxService,
    private router: Router,
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
      timeline.FinishReason = `${this.user?.Name || 'Admin'}  confirmed qoute`;
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
          // this.onLoad();
        }
      });
    }
  }

  close(){
    this.closeEvent.emit();
  }
}
