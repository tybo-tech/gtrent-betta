import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatComponent } from '../shared/chat/chat/chat.component';
import { ChatsComponent } from '../shared/chat/chats/chats.component';
import { QouteDetailsComponent } from '../shared/qoutes/qoute-details/qoute-details.component';
import { QouteComponent } from '../shared/qoutes/qoute/qoute.component';
import { QoutesComponent } from '../shared/qoutes/qoutes/qoutes.component';
import { ViewQouteComponent } from '../shared/qoutes/view-qoute/view-qoute.component';
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
import { TechCustomerListComponent } from './tech-customer-list/tech-customer-list.component';
import { TechCustomerComponent } from './tech-customer/tech-customer.component';

const routes: Routes = [
  {
    path: '',
    component: TechnicianComponent,
    children: [
      { path: '', component: TechnicianDashboardComponent },
      { path: 'fsr/:id', component: NewFsrComponent },
      { path: 'qoutes', component: QoutesComponent },
      { path: 'customers', component: TechCustomerListComponent },
      { path: 'customers/:id', component: TechCustomerComponent },
      { path: 'qoute/:id', component: QouteComponent },
      { path: 'qoute-details/:id', component: QouteDetailsComponent },
      { path: 'view-qoute/:id', component: ViewQouteComponent },
      { path: 'chats', component: ChatsComponent },
      { path: 'chats/:id', component: ChatComponent },
      { path: 'task/:id', component: DoTaskComponent },
      { path: 'test-success/:id', component: TestSuccessComponent },
      { path: 'task-complited/:id', component: TaskComplitedComponent },
      { path: 'task-complited/:id/:id2', component: TaskComplitedComponent },
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
  DoTaskComponent,
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TechnicianRoutingModule {}
