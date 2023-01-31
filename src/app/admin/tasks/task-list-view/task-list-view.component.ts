import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { getStatusClass } from 'src/app/shared/helpers/task.helper';
import { TaskModel } from 'src/models/task.model';
import { User } from 'src/models/user.model';

@Component({
  selector: 'app-task-list-view',
  templateUrl: './task-list-view.component.html',
  styleUrls: ['./task-list-view.component.scss']
})
export class TaskListViewComponent implements OnInit {

  @Input() task?: TaskModel;
  @Output() openMenuEvent = new EventEmitter<any>();
  status: string[] = []
  constructor(private ro: Router) {}

  ngOnInit(): void {
    if(this.task)
    this.status = [getStatusClass(this.task.Status)]
  }
  openMenu(task: TaskModel) {
    this.ro.navigate([`/admin/task/${task.TaskId}`])
  }

}
