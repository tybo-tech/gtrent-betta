import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskModel } from 'src/models/task.model';
import { User } from 'src/models/user.model';
import { AccountService } from 'src/services/account.service';
import { TaskService } from 'src/services/task.service';

@Component({
  selector: 'app-do-task',
  templateUrl: './do-task.component.html',
  styleUrls: ['./do-task.component.scss'],
})
export class DoTaskComponent implements OnInit {
  taskId = 0;
  user?: User;
  task?: TaskModel;
  constructor(
    private accountService: AccountService,
    private activatedRoute: ActivatedRoute,
    private taskService: TaskService
  ) {
    this.activatedRoute.params.subscribe((r) => {
      this.user = this.accountService.currentUserValue;
      let id = r['id'];
      if (id) this.taskId = Number(id);
      if (this.taskId) this.getTask();
    });
  }
  getTask() {
    this.taskService.get(this.taskId).subscribe((data) => {
      this.task = data;
    });
  }

  ngOnInit(): void {}
  save() {
    if (!this.task) return;
    this.taskService.save(this.task).subscribe((data) => {
      console.log(data);
    });
  }
}
