import { Component, OnInit } from '@angular/core';
import {
  gatTaskCardStatus,
  groupTaskByStatus,
  loadTaskDates,
} from 'src/app/shared/helpers/task.helper';
import { TaskModel } from 'src/models/task.model';
import { User } from 'src/models/user.model';
import { ITaskGroupedByStatusModel } from 'src/models/ux.model';
import { AccountService } from 'src/services/account.service';
import { TaskService } from 'src/services/task.service';
import { UserService } from 'src/services/user.service';
import { UxService } from 'src/services/ux.service';
import { TASK_STATUS_LIST } from 'src/utits/constants';

@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.scss'],
})
export class TaskBoardComponent implements OnInit {
  tasks: TaskModel[] = [];
  task?: TaskModel;
  user?: User;
  filterBy = 'All';
  filterDate = '';
  filterDate2 = '';
  TASK_STATUS_LIST = TASK_STATUS_LIST;
  users: User[] = [];
  groups: ITaskGroupedByStatusModel[] = [];
  grid: any = {};
  dates: string[] = [];
  userId: string = '';
  //Customers
  constructor(
    private taskService: TaskService,
    private accountService: AccountService,
    private userService: UserService,
    private uxService: UxService,
  ) {}

  ngOnInit(): void {
    this.accountService.user.subscribe((data) => {
      this.user = data;
    });
    this.userService.getAllUsers();
    this.userService.userListObservable.subscribe((data) => {
      if (data?.length)
        this.users = data;
        // this.users = data.filter((x) => x.UserType === 'Technician');
    });
    this.load();
    setInterval(() => {
      this.load();
    }, 5000);
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
    this.uxService.updateUXState({Loading: true})
    this.load();
  }
  userChaged() {
    this.uxService.updateUXState({Loading: true})
    this.load();
  }
  load() {
    // this.uxService.updateUXState({Loading: true})
    this.taskService
      .list(this.filterDate, this.filterDate2, this.userId)
      .subscribe((data) => {
        this.uxService.updateUXState({Loading: false})

        this.tasks = data || [];
        if (this.filterBy === 'All') {
          this.dates = loadTaskDates(this.tasks);
        }
        gatTaskCardStatus(this.tasks);
        this.groups = groupTaskByStatus(this.tasks).filter(
          (x) => x.Tasks.length
        );
        if (this.groups.length) {
          this.grid = {
            'grid-template-columns': `repeat(${this.groups.length},${
              96 / Number(this.groups.length)
            }rem)`,
          };
          // this.grid = {
          //   'grid-template-columns': `repeat(${this.groups.length},${
          //     96 / Number(this.groups.length)
          //   }%)`,
          // };
        }
      });
  }
}
