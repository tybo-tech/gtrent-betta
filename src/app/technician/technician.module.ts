import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TechnicianRoutingModule,declarations } from './technician-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { TestSuccessComponent } from './test-success/test-success.component';
import { TechnicainTaskBoardComponent } from './technicain-task-board/technicain-task-board.component';
import { TaskComplitedComponent } from './task-complited/task-complited.component';


@NgModule({
  declarations: [
...declarations,
TestSuccessComponent,
TechnicainTaskBoardComponent,
TaskComplitedComponent
  ],
  imports: [
    CommonModule,
    TechnicianRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class TechnicianModule { }
