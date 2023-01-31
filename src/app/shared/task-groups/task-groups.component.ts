import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { TaskModel } from 'src/models/task.model';
import { ITaskGroupedByDateModel } from 'src/models/ux.model';
import { proccessTask as getTaskGroups } from '../helpers/task.helper';

@Component({
  selector: 'app-task-groups',
  templateUrl: './task-groups.component.html',
  styleUrls: ['./task-groups.component.scss'],
})
export class TaskGroupsComponent implements OnInit, AfterViewInit {
  @Input() tasks?: TaskModel[];
  @Output() taskGroupEvent = new EventEmitter<ITaskGroupedByDateModel>();
  @Output() openMenuEvent = new EventEmitter<any>();

  taskGroups: ITaskGroupedByDateModel[] = [];
  currentTask?: ITaskGroupedByDateModel;

  constructor() {}
  ngAfterViewInit(): void {
    document.getElementById('active')?.scrollIntoView({ behavior: 'smooth' });
  }

  ngOnInit(): void {
    if (this.tasks?.length) {
      this.taskGroups = [];
      this.taskGroups = getTaskGroups(this.tasks);
      this.currentTask = this.taskGroups.find((x) => x.Active);
      this.taskGroupEvent.emit(this.currentTask);
    }
  }
  toggleGroup(group: ITaskGroupedByDateModel) {
    const action = !group.Active;
    this.taskGroups.map((x) => (x.Active = false));
    group.Active = action;
  }
  selectTask(group: ITaskGroupedByDateModel) {
    this.taskGroups.map((x) => {
      x.Active = false;
      x.Classes = [];
      return x;
    });
    group.Classes = ['card-active'];
    group.Active = true;
    this.currentTask = group;
    this.taskGroupEvent.emit(this.currentTask);
  }

  openMenu(task: TaskModel) {
    this.openMenuEvent.emit(task);
  }
}
