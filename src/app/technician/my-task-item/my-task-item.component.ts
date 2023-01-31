import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { getStatusClass } from 'src/app/shared/helpers/task.helper';
import { TaskModel } from 'src/models/task.model';
import { User } from 'src/models/user.model';

@Component({
  selector: 'app-my-task-item',
  templateUrl: './my-task-item.component.html',
  styleUrls: ['./my-task-item.component.scss'],
})
export class MyTaskItemComponent implements OnInit {
  @Input() task?: TaskModel;
  @Input() user?: User;
  @Output() openMenuEvent = new EventEmitter<any>();
  status: string[] = []
  constructor() {}

  ngOnInit(): void {
    if(this.task)
    this.status = [getStatusClass(this.task.Status)]
  }
  openMenu(task: TaskModel) {
    this.openMenuEvent.emit()
    task.OpenMenu = true;
  }
}
