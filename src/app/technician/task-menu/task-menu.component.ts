import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { getTaskInitActionName } from 'src/app/shared/helpers/task.helper';
import { TaskModel } from 'src/models/task.model';
import { User } from 'src/models/user.model';
import { TaskService } from 'src/services/task.service';
import { UxService } from 'src/services/ux.service';
import { TASK_STATUS, TASK_TYPES } from 'src/utits/constants';

@Component({
  selector: 'app-task-menu',
  templateUrl: './task-menu.component.html',
  styleUrls: ['./task-menu.component.scss'],
})
export class TaskMenuComponent implements OnInit {
  @Input() user?: User;
  @Input() task?: TaskModel;
  @Output() closeMenuEvent = new EventEmitter<any>();
  TASK_STATUS = TASK_STATUS;
  TASK_TYPES = TASK_TYPES;
  orderNo: string = '';
  actionName = 'Start task';
  constructor(
    private router: Router,
    private uxService: UxService,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    if (this.task) this.actionName = getTaskInitActionName(this.task);
  }
  closeMenu() {
    this.closeMenuEvent.emit();
  }
  startTask() {
    if (!this.user || !this.task) return;
    if (this.task.TaskType === TASK_TYPES.OnsiteFSR) this.startFsr();
    if (this.task.TaskType === TASK_TYPES.WorkshopFSR) this.startFsr();
    if (this.task.TaskType === TASK_TYPES.General) this.updateTask();
  }

  startFsr() {
    if (!this.user || !this.task) return;
    this.map();
    this.updateTask();
  }
  updateTask() {
    if (this.task) {
      const type = this.task.TaskType;
      const status =
        type === TASK_TYPES.WorkshopFSR
          ? TASK_STATUS.RunningTest
          : TASK_STATUS.InProgress;
      this.task.Status = status;
      this.task.StarDateTime = `${new Date()}`;
      const timeline = this.taskService.initTimeLine();
      this.task.TimeLines = [timeline];
      this.taskService.save(this.task).subscribe((r) => {
        if (this.task?.TaskType === TASK_TYPES.OnsiteFSR) this.goToFsr();
        if (this.task?.TaskType === TASK_TYPES.WorkshopFSR) this.goToFsr();
        if (this.task?.TaskType === TASK_TYPES.General) this.gotoTask();
      });
    }
  }
  goToFsr() {
    if (this.task) this.router.navigate(['/technician/fsr', this.task.TaskId]);
  }
  gotoTask() {
    if (this.task) this.router.navigate(['/technician/task', this.task.TaskId]);
  }
  map() {
    if (this.task && this.task.Machine) {
      if (!this.task.Fsr) this.task.Fsr = this.taskService.initFsr();
      this.task.Fsr.Model = `${this.task.Machine.Model}`;
      this.task.Fsr.Serial = `${this.task.Machine.Serial}`;
      this.task.Fsr.Hours = `${this.task.Machine.Hours}`;
      this.task.Fsr.TechnicainName = this.user?.Name || '';
    }
  }
}
