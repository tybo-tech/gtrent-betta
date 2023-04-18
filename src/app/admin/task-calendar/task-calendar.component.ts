import { Component, OnInit } from '@angular/core';
import {
  getDaysArray,
  getGroupWeeks,
  IWeekGroup,
} from 'src/app/shared/helpers/date.helper';
import {
  loadTaskDates,
  gatTaskCardStatus,
  groupTaskByStatus,
} from 'src/app/shared/helpers/task.helper';
import { TabModel } from 'src/models/shared.model';
import { TaskModel } from 'src/models/task.model';
import { User } from 'src/models/user.model';
import { ITaskGroupedByStatusModel } from 'src/models/ux.model';
import { AccountService } from 'src/services/account.service';
import { TaskService } from 'src/services/task.service';
import { UserService } from 'src/services/user.service';
import { UxService } from 'src/services/ux.service';
import { TASK_STATUS, TASK_STATUS_LIST } from 'src/utits/constants';

@Component({
  selector: 'app-task-calendar',
  templateUrl: './task-calendar.component.html',
  styleUrls: ['./task-calendar.component.scss'],
})
export class TaskCalendarComponent implements OnInit {
  tasks: TaskModel[] = [];
  allTasks: TaskModel[] = [];
  task?: TaskModel;
  user?: User;
  filterBy = 'All';
  filterDate = '';
  status = 'All';
  selectWeekName = '';
  filterDate2 = '';
  TASK_STATUS_LIST = TASK_STATUS_LIST;
  users: User[] = [];
  // groups: ITaskGroupedByStatusModel[] = [];
  grid: any = {};
  dates: string[] = [];
  userId: string = '';
  weeks: IWeekGroup[] = [];
  week?: IWeekGroup;

  tabs: TabModel[] = [
    {
      Name: 'All Statuses',
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
  //Customers
  constructor(
    private taskService: TaskService,
    private accountService: AccountService,
    private userService: UserService,
    private uxService: UxService
  ) {}

  ngOnInit(): void {
    // console.log(weeks);
    this.accountService.user.subscribe((data) => {
      this.user = data;
    });
    this.userService.getAllUsers();
    this.userService.userListObservable.subscribe((data) => {
      if (data?.length) this.users = data;
      // this.users = data.filter((x) => x.UserType === 'Technician');
    });
    this.load();
    // setInterval(() => {
    //   this.load();
    // }, 5000);
  }
  dateSelcted() {
    this.weeks.map((x) => (x.Active = false));
    this.week = this.weeks.find((x) => x.WeekName === this.selectWeekName);
    this.filterWeek(this.status)
  }
  select(task: TaskModel) {
    this.task = task;
  }
  filterByChanged() {
    if (this.filterBy === 'Filter by single date') {
      this.filterDate2 = '';
      this.load();
    }
    if (this.filterBy === 'All') {
      this.filterDate = '';
      this.filterDate2 = '';
      this.load();
    }
  }
  dateChnaged() {
    this.uxService.updateUXState({ Loading: true });
    this.load();
  }
  userChaged() {
    // this.uxService.updateUXState({Loading: true})
    // this.load();
    if (this.userId === 'All') {
      this.tasks = this.allTasks;
      return;
    }
    if (this.userId === 'Unallocated') {
      this.tasks = this.allTasks.filter((x) => x.AssignedTo === '');
    } else {
      this.tasks = this.allTasks.filter((x) => x.AssignedTo === this.userId);
    }
  }

  filterByStatus() {
    this.tab = this.tabs.find((x) => x.Id === this.status);
    if (!this.tab) return;
    if (this.tab.Id === 'All') {
      this.filterWeek(this.tab.Id);
      return;
    }
    if (this.tab) {
      this.filterWeek(this.tab?.Id);
    }
  }
  load() {
    // this.uxService.updateUXState({Loading: true})
    this.taskService
      .list( this.filterDate, this.filterDate2, this.userId)
      .subscribe((data) => {
        this.uxService.updateUXState({ Loading: false });

        this.tasks = data || [];
        this.allTasks = data || [];
        if (this.filterBy === 'All') {
          this.dates = loadTaskDates(this.tasks);
        }

        this.loadWeek();
      });
  }
  loadWeek() {
    const date = new Date();
    const datesOfTheYear = getDaysArray(
      new Date(`${date.getFullYear()}-01-01`),
      new Date(`${date.getFullYear()}-12-31`)
    );
    this.weeks = getGroupWeeks(datesOfTheYear, this.tasks);
    gatTaskCardStatus(this.tasks);
    if (this.weeks.length) this.week = this.weeks.find((x) => x.Active);
    if (this.week) {
      this.selectWeekName = this.week.WeekName;
    }
  }
  filterWeek(status: string) {
    if (this.week) {
      if (status !== 'All') {
        this.week.Days.forEach((day) => {
          day.Tasks = day.AllTasks.filter((x) => x.Status === status);
        });
      } else {
        this.week.Days.forEach((day) => {
          day.Tasks = day.AllTasks;
        });
      }
    }
  }
}
