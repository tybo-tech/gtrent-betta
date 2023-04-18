import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TabModel} from 'src/models/shared.model';
import { TaskModel } from 'src/models/task.model';
import { User } from 'src/models/user.model';
import { AccountService } from 'src/services/account.service';
import { TaskService } from 'src/services/task.service';
import { UserService } from 'src/services/user.service';
import { UxService } from 'src/services/ux.service';
import { TASK_STATUS } from 'src/utits/constants';

@Component({
  selector: 'app-qoutes',
  templateUrl: './qoutes.component.html',
  styleUrls: ['./qoutes.component.scss']
})
export class QoutesComponent implements OnInit {

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
    {
      Name: TASK_STATUS.RunningTest,
      Id: TASK_STATUS.RunningTest,
      Classes: [],
    },
    {
      Name: TASK_STATUS.RunningTestPaused,
      Id: TASK_STATUS.RunningTestPaused,
      Classes: [],
    },
    {
      Name: TASK_STATUS.WaitingForQoute,
      Id: TASK_STATUS.WaitingForQoute,
      Classes: [],
    },
    {
      Name: TASK_STATUS.QouteDone,
      Id: TASK_STATUS.QouteDone,
      Classes: [],
    },
    {
      Name: TASK_STATUS.Complete,
      Id: TASK_STATUS.Complete,
      Classes: [],
    },
  ];
  tab?: TabModel = this.tabs[0];
  users: User[] = [];
  status = 'All';
  query = '';
  cols = 9;


  tasks: TaskModel[] = [];
  allTasks: TaskModel[] = [];
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

    this.taskService.listByType('Quote').subscribe((data) => {
      if (data && data.length) {
        if (this.user && this.user.UserType === 'Technician')
          data =
            (this.user?.UserId &&
              data.filter((x) => x.CreatedBy === this.user?.UserId)) ||
            [];
        this.tasks = data;
        this.allTasks = data;
      }
    });
  }
  viewDetails(item: TaskModel){
    if(!this.user) return;
    if (this.user?.UserType === 'Admin')
    this.router.navigate(['/admin/view-qoute', item.TaskId]);
  else this.router.navigate(['/technician/view-qoute', item.TaskId]);
  }

  changeTab() {
    this.tab = this.tabs.find((x) => x.Id === this.status);
    if (!this.tab) return;
    if (this.tab.Id === 'All') {
      this.tasks = this.allTasks;
      return;
    }
    if (this.tab) {
      this.tasks = this.allTasks.filter((x) => x.Status === this.tab?.Id);
    }
  }
}
