import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getStatusClass } from 'src/app/shared/helpers/task.helper';
import {
  ListItemEventModel,
  ListItemModel,
  TabModel,
} from 'src/models/shared.model';
import { TaskModel } from 'src/models/task.model';
import { User } from 'src/models/user.model';
import { AccountService } from 'src/services/account.service';
import { TaskService } from 'src/services/task.service';
import { UserService } from 'src/services/user.service';
import { UxService } from 'src/services/ux.service';
import { TASK_STATUS } from 'src/utits/constants';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  tabs: TabModel[] = [
    {
      Name: TASK_STATUS.All,
      Id: TASK_STATUS.All,
      Classes: ['active'],
    },
    {
      Name: TASK_STATUS.NotStarted,
      Id: TASK_STATUS.NotStarted,
      Classes: [],
    },
    {
      Name: TASK_STATUS.Paused,
      Id: TASK_STATUS.Paused,
      Classes: [],
    },
    {
      Name: TASK_STATUS.InProgress,
      Id: TASK_STATUS.InProgress,
      Classes: [],
    },
    {
      Name: TASK_STATUS.Complete,
      Id: TASK_STATUS.Complete,
      Classes: [],
    },
  ];
  tab: TabModel = this.tabs[0];
  users: User[] = [];

  grid = { 'grid-template-columns': '15% 20% 10% 10% 8% 10% 15% auto' };
  headers = [
    'Customer',
    'Title',
    'Type',
    'Due Date',
    'Time',
    'Assigned to',
    'Status',
    'Actions',
  ];
  tasks: TaskModel[] = [];
  allTasks: TaskModel[] = [];
  items: ListItemModel[] = [];
  user?: User;
  constructor(
    private taskService: TaskService,
    private accountService: AccountService,
    private uxService: UxService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.load();
    this.userService.userListObservable.subscribe((data) => {
      if (data?.length) this.users = data;
    });
  }

  load() {
    this.accountService.user.subscribe((data) => {
      this.user = data;
    });

    this.taskService.list(2).subscribe((data) => {
      if (data && data.length) {
        if (this.user && this.user.UserType === 'Technician')
          data =
            (this.user?.UserId &&
              data.filter((x) => x.AssignedTo === this.user?.UserId)) ||
            [];
        this.tasks = data;
        this.allTasks = data;
        this.mapItems();
      }
    });
  }
  mapItems() {
    this.items = [];
    this.tasks.forEach((task) => {
      this.items.push({
        Id: task.TaskId + '',
        Col1: {
          Id: '',
          Value: task.Customer?.Name || '-----------',
          Type: 'text',
          ShowOptions: false,
          Editing: false,
          Classes: [],
        },
        Col2: {
          Id: '',
          Value: task.Name,
          Type: 'text',
          ShowOptions: false,
          Editing: false,
          Classes: [],
        },
        Col3: {
          Id: '',
          Value: task.TaskType,
          Type: 'task-type',
          ShowOptions: false,
          Editing: false,
          Classes: [],
        },
        Col4: {
          Id: '',
          Value: task.DueDate || 'Not set',
          Type: 'date',
          ShowOptions: false,
          Editing: false,
          Classes: [],
        },
        Col5: {
          Id: '',
          Value: task.DueTime || 'Not set',
          Type: 'time',
          ShowOptions: false,
          Editing: false,
          Classes: [],
        },
        Col6: {
          Id: task.AssignedTo,
          Value: task.Assigned?.Name || 'Not Assigned',
          Type: 'user',
          ShowOptions: false,
          Editing: false,
          Classes: [],
        },
        Col7: {
          Id: '',
          Value: task.Status,
          Type: 'status',
          ShowOptions: false,
          Editing: false,
          Classes: [getStatusClass(task.Status)],
        },
        Col8: {
          Id: task.TaskId+'',
          Value: 'View Task',
          Type: 'action',
          ShowOptions: false,
          Editing: false,
          Classes: ['link-success'],
        },
        Classes: [],
        ShowId: false,
      });
    });
  }
  rowEvent(event: ListItemEventModel) {
    console.log('Full event', event);

    const task = this.tasks.find(
      (x) => Number(x.TaskId) === Number(event.Value.Id)
    );
    if (!task || !event?.Value) return;
    if (event.Column.Type === 'date') task.DueDate = event.Column.Value || '';
    if (event.Column.Type === 'time') task.DueTime = event.Column.Value || '';
    if (event.Column.Type === 'status') task.Status = event.Column.Value || '';
    if (event.Column.Type === 'task-type')
      task.TaskType = event.Column.Value || '';
    if (event.Column.Type === 'text') task.Name = event.Column.Value || '';
    if (event.Column.Type === 'user' && this.users.length) {
      task.AssignedTo = event.Column.Id || '';
      const u = this.users.find((x) => x.UserId === task.AssignedTo);
      task.Assigned = u;
      event.Column.Value = u?.Name || '';
    }
    if (event.Column.Type === 'action') {
      this.router.navigate(['/admin/task', event.Value.Id]);
      return
    }

    this.taskService.save(task).subscribe((r) => {
      this.uxService.updateUXState({
        Loading: false,
        Toast: {
          Title: 'Saved',
          Message: `Task updated succesfuly`,
          Classes: ['_success'],
        },
      });
    });
  }
  changeTab(){
    if(this.tab.Id === 'All'){
      this.tasks = this.allTasks;
      this.mapItems();
      return;
    }
    this.tasks = this.allTasks.filter(x=>x.Status === this.tab.Id);
    this.mapItems();
  }
}
