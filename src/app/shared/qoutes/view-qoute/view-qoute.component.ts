import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskModel } from 'src/models/task.model';
import { User } from 'src/models/user.model';
import { AccountService } from 'src/services/account.service';
import { TaskService } from 'src/services/task.service';
import { UserService } from 'src/services/user.service';
import { UxService } from 'src/services/ux.service';

@Component({
  selector: 'app-view-qoute',
  templateUrl: './view-qoute.component.html',
  styleUrls: ['./view-qoute.component.scss']
})
export class ViewQouteComponent implements OnInit {

  @Input() task?: TaskModel;
  users: User[] = [];
  userId = '';
  taskId = 0;
  user: User | undefined;
  constructor(
    private userService: UserService,
    private uxService: UxService,
    private taskService: TaskService,
    private accountService: AccountService,
    private activatedRoute: ActivatedRoute,

  ) {
    this.activatedRoute.params.subscribe((r) => {
      this.user = this.accountService.currentUserValue;
      this.taskId = r['id'];
      if (this.taskId) this.getTask();
    });
  }

  ngOnInit(): void {
    this.userService.userListObservable.subscribe((data) => {
      if (data?.length) this.users = data;
      // this.users = data.filter((x) => x.UserType === 'Technician');
    });
  }
  getTask() {
    this.taskService.get(this.taskId).subscribe((data) => {
      if (data && data.TaskId) {
this.task = data;
      }
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
