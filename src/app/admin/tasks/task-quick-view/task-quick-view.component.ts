import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TaskModel } from 'src/models/task.model';

@Component({
  selector: 'app-task-quick-view',
  templateUrl: './task-quick-view.component.html',
  styleUrls: ['./task-quick-view.component.scss']
})
export class TaskQuickViewComponent implements OnInit {
@Input() tasks: TaskModel[] = [];
@Output() closeEvent = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }
close(){
  this.closeEvent.emit(true);
}
}
