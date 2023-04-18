import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  loadTaskDates,
  groupTaskByStatus,
} from 'src/app/shared/helpers/task.helper';
import { TaskModel } from 'src/models/task.model';
import { User } from 'src/models/user.model';
import { ITaskGroupedByStatusModel } from 'src/models/ux.model';
import { AccountService } from 'src/services/account.service';
import { TaskService } from 'src/services/task.service';
import { UserService } from 'src/services/user.service';
import { UxService } from 'src/services/ux.service';
import { TASK_STATUS, TASK_STATUS_LIST } from 'src/utits/constants';

@Component({
  selector: 'app-technicain-task-board',
  templateUrl: './technicain-task-board.component.html',
  styleUrls: ['./technicain-task-board.component.scss'],
})
export class TechnicainTaskBoardComponent implements OnInit {
  @Input() user?: User;
  @Output() openMenuEvent = new EventEmitter<any>();

  tasks: TaskModel[] = [];
  task?: TaskModel;
  // user?: User;
  filterBy = 'All';
  filterDate = '';
  filterDate2 = '';
  TASK_STATUS_LIST = TASK_STATUS_LIST;
  groups: ITaskGroupedByStatusModel[] = [];
  grid: any = {};
  dates: string[] = [];
  userId: string = '';
  group?: ITaskGroupedByStatusModel;
  //Customers
  constructor(
    private taskService: TaskService,
    private accountService: AccountService,
    private userService: UserService,
    private uxService: UxService
  ) {}

  ngOnInit(): void {
    if (this.user) this.userId = this.user.UserId || '';
    this.load();
    setInterval(() => {
      this.load();
    }, 5000);
  }

  openMenu(task: TaskModel) {
    this.openMenuEvent.emit(task);
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
    this.load();
  }

  toggle(group: ITaskGroupedByStatusModel) {
    if (group.Active) {
      group.Active = false;
      this.group = group;
      return;
    }
    this.groups.map((x) => (x.Active = false));
    group.Active = true;
    this.group = group;
  }
  load() {
    // this.uxService.updateUXState({ Loading: true });
    this.taskService
      .list( this.filterDate, this.filterDate2, this.userId)
      .subscribe((data) => {
        // this.uxService.updateUXState({ Loading: false });

        this.tasks = data?.filter(x=>x.Status  !== TASK_STATUS.Complete) || [];
        if (this.filterBy === 'All') {
          this.dates = loadTaskDates(this.tasks);
        }
        this.groups = groupTaskByStatus(this.tasks).filter(
          (x) => x.Tasks.length
        );
        if (this.group && this.groups.length) {
          // debugger
          this.groups.map((x) => (x.Active = false));
          const g = this.groups.find((x) => x.Status === this.group?.Status);
          if (g && this.group.Active) {
            g.Active = true;
            // this.toggle(g)
          }
        }
        if (this.groups.length) {
          this.grid = {
            'grid-template-columns': `repeat(${this.groups.length},${
              96 / Number(this.groups.length)
            }%)`,
          };
        }
      });
  }
}
