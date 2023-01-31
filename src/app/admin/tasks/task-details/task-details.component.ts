import { Component, Input, OnInit } from '@angular/core';
import { TaskModel } from 'src/models/task.model';
import { User } from 'src/models/user.model';
import { TaskService } from 'src/services/task.service';
import { UserService } from 'src/services/user.service';
import { UxService } from 'src/services/ux.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss'],
})
export class TaskDetailsComponent implements OnInit {
  @Input() task?: TaskModel;
  users: User[] = [];
  userId = '';
  constructor(
    private userService: UserService,
    private taskService: TaskService,
    private uxService: UxService
  ) {}

  ngOnInit(): void {
    this.userService.userListObservable.subscribe((data) => {
      if (data?.length) this.users = data;
      // this.users = data.filter((x) => x.UserType === 'Technician');
    });
  }
  userChaged() {
    if (this.task && this.users?.length) {
      this.task.Assigned = this.users.find(
        (x) => x.UserId === this.task?.AssignedTo
      );
      this.uxService.updateUXState({
        Loading: true
      });
      this.taskService.save(this.task).subscribe((data) => {
        this.uxService.updateUXState({
          Loading: false,
          Toast: {
            Title: 'Task updated',
            Message: ``,
            Classes: ['_success'],
          },
        });
      });
    }
  }
}
