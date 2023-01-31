import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { getStatusClass, getTaskCounts } from 'src/app/shared/helpers/task.helper';
import { TaskModel } from 'src/models/task.model';

@Component({
  selector: 'app-task-by-status',
  templateUrl: './task-by-status.component.html',
  styleUrls: ['./task-by-status.component.scss'],
})
export class TaskByStatusComponent implements OnInit, OnChanges {
  @Input() tasks?: TaskModel[];
  @Output() openMenuEvent = new EventEmitter<any>();
  status: string[] = [];
  overview:any[]=[];
  showList = false;
  filteredList: TaskModel[] = [];
  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
  // alert(8)
  if(this.tasks)
  this.overview = getTaskCounts(this.tasks)
  }

  ngOnInit(): void {
    if (this.tasks?.length) {
      this.tasks.forEach((task) => {
        this.status = [getStatusClass(task.Status)];
      });
      this.overview = getTaskCounts(this.tasks)
    }
  }
  openMenu(task: TaskModel) {
    this.openMenuEvent.emit();
    task.OpenMenu = true;
  }
  onShowList(status: string){
    this.showList = true;
    this.filteredList = this.tasks?.filter(x=>x.Status === status) || []
  }
}
