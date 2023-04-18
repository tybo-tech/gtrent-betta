import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { proccessTask } from 'src/app/shared/helpers/task.helper';
import { TaskModel } from 'src/models/task.model';
import { User } from 'src/models/user.model';
import { ITaskGroupedByDateModel } from 'src/models/ux.model';
import { AccountService } from 'src/services/account.service';
import { TaskService } from 'src/services/task.service';
import { TASK_STATUS_LIST } from 'src/utits/constants';

@Component({
  selector: 'app-technician-dashboard',
  templateUrl: './technician-dashboard.component.html',
  styleUrls: ['./technician-dashboard.component.scss'],
})
export class TechnicianDashboardComponent implements OnInit {
  tasks: TaskModel[] = [];
  allTasks: TaskModel[] = [];
  user?: User;
  showMenu = false;
  currentTask?: ITaskGroupedByDateModel;
  TASK_STATUS_LIST = ['All', ...TASK_STATUS_LIST];
  status = 'All';
  statusFilter = [
    {
      Name: 'Todo',
      Classes: ['btn', 'btn-dark'],
    },
    {
      Name: 'Missed',
      Classes: ['btn', 'btn-light'],
    },
    {
      Name: 'Complete',
      Classes: ['btn', 'btn-light'],
    },
  ];
  // statusFilter = [
  //   {
  //     Name: 'New tasks',
  //     Classes: ['btn', 'btn-dark'],
  //   },
  //   {
  //     Name: 'Old tasks',
  //     Classes: ['btn', 'btn-light'],
  //   },
  // ];
  task?: TaskModel;
  constructor(
    private taskService: TaskService,
    private router: Router,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.accountService.user.subscribe((data) => {
      if (data) {
        this.user = data;
        this.load(data);
      }
    });

    this.accountService.refreshOnce();
    this.accountService.refresh();
  }

  load(user: User) {
    this.taskService.listByUserId(user.UserId).subscribe((data) => {
      if (data && data.length) {
        this.allTasks = data;
        this.tasks = data;
      }
    });
  }

  onOpenMenuEvent(task: TaskModel) {
    if (task) {
      this.task = task;
      this.tasks.map((x) => (x.OpenMenu = false));
      task.OpenMenu = true;
    }
  }
  logout() {
    this.accountService.logout();
    this.router.navigate(['/']);
  }
}
