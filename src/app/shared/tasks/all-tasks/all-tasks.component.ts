import { Component, OnInit } from '@angular/core';
import { TaskModel } from 'src/models/task.model';
import { User } from 'src/models/user.model';
import { AccountService } from 'src/services/account.service';
import { TaskService } from 'src/services/task.service';

@Component({
  selector: 'app-all-tasks',
  templateUrl: './all-tasks.component.html',
  styleUrls: ['./all-tasks.component.scss'],
})
export class AllTasksComponent implements OnInit {
  tasks: TaskModel[]=[];
  user?: User;
  notStartedTasks: TaskModel[]=[];
  doneTasks: TaskModel[]=[];
  inProgressTasks: TaskModel[]=[];
  pausedTasks: TaskModel[]=[];
  //Customers
  constructor(
    private taskService: TaskService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.accountService.user.subscribe((data) => {
      this.user = data;
    });

    this.taskService.list().subscribe((data) => {
      if (data && data.length) {
        if (this.user && this.user.UserType === 'Technician')
          data = this.user?.UserId && data.filter((x) => x.AssignedTo === this.user?.UserId) || [];
        this.tasks = data;
        this.notStartedTasks = data.filter((x) => x.Status === 'Not started');
        this.doneTasks = data.filter((x) => x.Status === 'Done');
        this.inProgressTasks = data.filter((x) => x.Status === 'In progress');
        this.pausedTasks = data.filter((x) => x.Status === 'Paused');
      }
    });
  }
}
