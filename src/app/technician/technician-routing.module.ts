import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsumablesComponent } from './consumables/consumables.component';
import { DoTaskComponent } from './do-task/do-task.component';
import { LabourComponent } from './labour/labour.component';
import { MyTaskItemComponent } from './my-task-item/my-task-item.component';
import { MyTasksComponent } from './my-tasks/my-tasks.component';
import { NewFsrComponent } from './new-fsr/new-fsr.component';
import { ServicePartsComponent } from './service-parts/service-parts.component';
import { TaskComplitedComponent } from './task-complited/task-complited.component';
import { TaskMenuComponent } from './task-menu/task-menu.component';
import { TechnicianDashboardComponent } from './technician-dashboard/technician-dashboard.component';
import { TechnicianComponent } from './technician/technician.component';
import { TestSuccessComponent } from './test-success/test-success.component';

const routes: Routes = [
  {
    path: '',
    component: TechnicianComponent,
    children: [
      { path: '', component: TechnicianDashboardComponent },
      { path: 'fsr/:id', component: NewFsrComponent },
      { path: 'task/:id', component: DoTaskComponent },
      { path: 'test-success/:id', component: TestSuccessComponent },
      { path: 'task-complited/:id', component: TaskComplitedComponent },
    ],

    // { path: '', component: FiitingRoomComponent },
  },
];

export const declarations = [
  TechnicianDashboardComponent,
  TechnicianComponent,
  MyTasksComponent,
  MyTaskItemComponent,
  TaskMenuComponent,
  NewFsrComponent,
  ServicePartsComponent,
  LabourComponent,
  ConsumablesComponent,
  DoTaskComponent,
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TechnicianRoutingModule {}
