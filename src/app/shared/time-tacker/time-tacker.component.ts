import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { OrderModel } from 'src/models/order.model';
import { TimeDiffModel } from 'src/models/shared.model';
import { TaskModel, TimeLineModel } from 'src/models/task.model';
import { User } from 'src/models/user.model';
import { AccountService } from 'src/services/account.service';
import { TaskService } from 'src/services/task.service';
import { UxService } from 'src/services/ux.service';
import {
  TASK_STATUS,
  TASK_TYPES_LIST,
  TIMELINE_STATUS,
} from 'src/utits/constants';
import {
  calculateTimeElapsed,
  combineTimeDiff,
  fixDaysTo0,
  fixMinutesTo60,
  fixSecondsTo60,
  formatToTwoDigits,
  getReadyForViewTime,
  getTimeDiffAndPrettyText,
} from '../helpers/date.helper';

@Component({
  selector: 'app-time-tacker',
  templateUrl: './time-tacker.component.html',
  styleUrls: ['./time-tacker.component.scss'],
})
export class TimeTackerComponent implements OnInit {
  @Input() task?: TaskModel;
  @Input() user?: User;
  @Input() disableActions = false;
  @Output() onStop = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<any>();
  @Output() onSave = new EventEmitter<TaskModel>();
  TASK_TYPES_LIST = TASK_TYPES_LIST;

  time = '00:00:00';
  showReasonFrom: boolean = false;
  isAdmin: boolean = false;
  timeLine?: TimeLineModel;
  statusClass: string = '';
  TIMELINE_STATUS = TIMELINE_STATUS;
  TASK_STATUS = TASK_STATUS;

  overallTimeElapsed?: TimeDiffModel;
  isTimeLineInProgress = false;
  intervalId: any;
  showConfirmDeleteTask: boolean = false;
  constructor(
    private taskService: TaskService,
    private uxService: UxService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.accountService.user.subscribe((data) => {
      if (data) this.user = data;
    });
    this.onLoad();
    this.isAdmin = this.user?.UserType === 'Admin';
  }
  saveTask() {
    if (this.task) this.onSave.emit(this.task);
  }
  onLoad() {
    if (this.task) {
      this.selectTimeline();
      this.overallTimeElapsed = calculateTimeElapsed(this.task);
      this.isTimeLineInProgress =
        (this.timeLine &&
          this.timeLine.StartStatus === TIMELINE_STATUS.Started &&
          !this.timeLine.FinishStatus) ||
        false;
      if (this.shouldTimeCount() && this.timeLine) {
        this.statusClass = '_success';
        var starDateTime = new Date(this.timeLine.StarDateTime);
        this.intervalId = setInterval(() => {
          let timePassed = getTimeDiffAndPrettyText(starDateTime);
          this.proccessTime(timePassed);
        }, 10);
      }

      if (
        this.timeLine &&
        (this.timeLine.FinishStatus === TIMELINE_STATUS.Paused ||
          this.timeLine.FinishStatus === TASK_STATUS.RunningTestPaused ||
          this.timeLine.FinishStatus === TASK_STATUS.WaitingForQoute ||
          this.timeLine.FinishStatus === TASK_STATUS.QouteDone)
      ) {
        if (this.intervalId) clearInterval(this.intervalId);

        this.statusClass = '_warn';
        let timePassed = this.taskService.initTimeDiff();
        this.proccessTime(timePassed);
      }
      if (
        this.timeLine &&
        this.timeLine.FinishStatus === TIMELINE_STATUS.Complete
      ) {
        if (this.intervalId) clearInterval(this.intervalId);

        this.statusClass = '_success';
        let timePassed = this.taskService.initTimeDiff();
        this.proccessTime(timePassed);
      }
    }
  }
  shouldTimeCount() {
    return this.timeLine && this.isTimeLineInProgress;
  }
  proccessTime(timePassed: TimeDiffModel) {
    if (this.overallTimeElapsed)
      timePassed = combineTimeDiff(timePassed, this.overallTimeElapsed);
    if (timePassed.days > 0) timePassed = fixDaysTo0(timePassed);
    if (timePassed.seconds > 60) timePassed = fixSecondsTo60(timePassed);
    if (timePassed.minutes > 60) timePassed = fixMinutesTo60(timePassed);
    this.time = getReadyForViewTime(timePassed);
  }
  selectTimeline() {
    if (!this.task) return;
    if (!this.task.TimeLines.length) return;

    this.timeLine = this.task.TimeLines[this.task.TimeLines.length - 1];
    if (
      !this.timeLine.FinishStatus &&
      [
        TASK_STATUS.RunningTestPaused,
        TASK_STATUS.Paused,
        TASK_STATUS.WaitingForQoute,
        TASK_STATUS.QouteDone,
      ].find((x) => x === this.task?.Status)
    ) {
      this.timeLine.FinishStatus = this.task.Status;
    }
  }
  askForAPausereason() {
    this.showReasonFrom = true;
  }
  deleteTask() {
    this.uxService.updateUXState({ Loading: true });

    if (!this.task) return;
    this.taskService.deleteTask(this.task.TaskId).subscribe((data) => {
      this.uxService.updateUXState({
        Loading: false,
        Toast: {
          Title: 'Task Deleted',
          Message: `You deleted this task`,
          Classes: ['_warn'],
        },
      });
      this.onDelete.emit();
    });
  }
  pauseTask() {
    // debugger;
    if (!this.task || !this.timeLine) return;
    if (this.task.Status === TASK_STATUS.InProgress) {
      this.task.Status = TASK_STATUS.Paused;
      this.timeLine.FinishStatus = TASK_STATUS.Paused;
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
          this.onLoad();
        }
      });
    }

    if (this.task.Status === TASK_STATUS.RunningTest) {
      this.task.Status = TASK_STATUS.RunningTestPaused;
      this.timeLine.FinishStatus = TASK_STATUS.RunningTestPaused;
      this.timeLine.FinishDateTime = `${new Date()}`;
      this.uxService.updateUXState({ Loading: true });
      this.taskService.save(this.task).subscribe((r) => {
        if (r && r.TaskId) {
          this.uxService.updateUXState({
            Loading: false,
            Toast: {
              Title: 'Running Test Paused',
              Message: `Reason: ${this.timeLine?.FinishReason}`,
              Classes: ['_warn'],
            },
          });
          this.task = r;
          this.onLoad();
        }
      });
    }
  }

  resumeTask() {
    if (!this.task) return;
    if (this.task && this.task.Status === TASK_STATUS.RunningTestPaused) {
      this.task.Status = TASK_STATUS.RunningTest;
      const timeline = this.taskService.initTimeLine(
        this.task.TimeLines.length
      );
      this.task.TimeLines.push(timeline);
      this.uxService.updateUXState({ Loading: true });
      this.taskService.save(this.task).subscribe((r) => {
        this.uxService.updateUXState({
          Loading: false,
          Toast: {
            Title: 'Task Resumed',
            Message: `Dont forget to stop the task when you are done.`,
            Classes: ['_success'],
          },
        });
        this.onLoad();
      });
    }
    if (
      this.task &&
      (this.task.Status === TASK_STATUS.Paused ||
        this.task.Status === TASK_STATUS.QouteDone)
    ) {
      this.task.Status = TASK_STATUS.InProgress;
      const timeline = this.taskService.initTimeLine(
        this.task.TimeLines.length
      );
      this.task.TimeLines.push(timeline);
      this.uxService.updateUXState({ Loading: true });
      this.taskService.save(this.task).subscribe((r) => {
        this.uxService.updateUXState({
          Loading: false,
          Toast: {
            Title: 'Task Resumed',
            Message: `Dont forget to stop the task when you are done.`,
            Classes: ['_success'],
          },
        });
        this.onLoad();
      });
    }
  }
  doneConfirm(confirmation: boolean) {
    if (confirmation) {
      this.deleteTask();
    }
    this.showConfirmDeleteTask = false;
  }
}
