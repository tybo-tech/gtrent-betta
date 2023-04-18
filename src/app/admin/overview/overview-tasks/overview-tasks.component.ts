import { Component, OnInit } from '@angular/core';
import { TaskModel } from 'src/models/task.model';
import { User } from 'src/models/user.model';
import { ITaskGroupedByDateModel } from 'src/models/ux.model';
import { AccountService } from 'src/services/account.service';
import { TaskService } from 'src/services/task.service';
import { UserService } from 'src/services/user.service';
import { TASK_STATUS, TASK_STATUS_LIST } from 'src/utits/constants';

@Component({
  selector: 'app-overview-tasks',
  templateUrl: './overview-tasks.component.html',
  styleUrls: ['./overview-tasks.component.scss'],
})
export class OverviewTasksComponent implements OnInit {
  tasks: TaskModel[] = [];
  user?: User;
  notStartedTasks: TaskModel[] = [];
  completedTasks: TaskModel[] = [];
  inProgressTasks: TaskModel[] = [];
  pausedTasks: TaskModel[] = [];
  overview: any[] = [];
  assignedTo = '';
  status = '';
  currentTask?: ITaskGroupedByDateModel;
  TASK_STATUS_LIST = TASK_STATUS_LIST;
  users: User[] = [];
  //Customers
  constructor(
    private taskService: TaskService,
    private accountService: AccountService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.accountService.user.subscribe((data) => {
      this.user = data;
    });
    this.userService.userListObservable.subscribe((data) => {
      if (data?.length) this.users = data;
    });
    this.taskService.list().subscribe((data) => {
      if (data && data.length) {
        this.tasks = data;
        this.notStartedTasks = data.filter(
          (x) => x.Status === TASK_STATUS.NotStarted
        );
        this.completedTasks = data.filter(
          (x) => x.Status === TASK_STATUS.Complete
        );
        this.inProgressTasks = data.filter(
          (x) => x.Status === TASK_STATUS.InProgress
        );
        this.pausedTasks = data.filter((x) => x.Status === TASK_STATUS.Paused);
        this.overview = [
          {
            Name: TASK_STATUS.NotStarted,
            Value: this.notStartedTasks.length,
          },
          {
            Name: TASK_STATUS.InProgress,
            Value: this.inProgressTasks.length,
          },
          {
            Name: TASK_STATUS.Paused,
            Value: this.pausedTasks.length,
          },
          {
            Name: TASK_STATUS.Complete,
            Value: this.completedTasks.length,
          },
        ];
      }
    });
  }
  dayChanged(e: ITaskGroupedByDateModel){
    this.currentTask = e;
  }
  filter() {
    if (!this.currentTask) return;
    if (!this.assignedTo && !this.status) {
      this.currentTask.Tasks = this.currentTask.AllTasks;
      return;
    }
    if (!this.assignedTo && this.status) {
      this.currentTask.Tasks = this.currentTask.AllTasks.filter(
        (x) => x.Status === this.status
      );
      return;
    }
    if (this.assignedTo && !this.status) {
      this.currentTask.Tasks = this.currentTask.AllTasks.filter(
        (x) => x.AssignedTo === this.assignedTo
      );
      return;
    }
    if (this.assignedTo && this.status) {
      this.currentTask.Tasks = this.currentTask.AllTasks.filter(
        (x) => x.AssignedTo === this.assignedTo && x.Status === this.status
      );
      return;
    }
  }
}
