import { Component, Input, OnInit } from '@angular/core';
import { TaskModel } from 'src/models/task.model';
import { getStatusClass } from '../helpers/task.helper';

@Component({
  selector: 'app-task-timelines',
  templateUrl: './task-timelines.component.html',
  styleUrls: ['./task-timelines.component.scss']
})
export class TaskTimelinesComponent implements OnInit {
  @Input() task?: TaskModel;

  constructor() { }

  ngOnInit(): void {
    if(this.task){
      this.task.TimeLines?.forEach(t=>{
        t.Classes = [getStatusClass(t.StartStatus)]
        t.FinishClasses = [getStatusClass(t.FinishStatus)]
      })
    }
  }

}
