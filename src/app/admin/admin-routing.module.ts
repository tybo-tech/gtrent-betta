import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatComponent } from '../shared/chat/chat/chat.component';
import { ChatsComponent } from '../shared/chat/chats/chats.component';
import { QouteDetailsComponent } from '../shared/qoutes/qoute-details/qoute-details.component';
import { QouteComponent } from '../shared/qoutes/qoute/qoute.component';
import { QoutesComponent } from '../shared/qoutes/qoutes/qoutes.component';
import { ViewQouteComponent } from '../shared/qoutes/view-qoute/view-qoute.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminNavComponent } from './admin-nav/admin-nav.component';
import { AdminComponent } from './admin/admin.component';
import { CustomerComprossorsComponent } from './customers/customer-comprossors/customer-comprossors.component';
import { CustomerFormComponent } from './customers/customer-form/customer-form.component';
import { CustomerFsrComponent } from './customers/customer-fsr/customer-fsr.component';
import { CustomerReportsComponent } from './customers/customer-reports/customer-reports.component';
import { CustomerComponent } from './customers/customer/customer.component';
import { CustomersComponent } from './customers/customers/customers.component';
import { FsrDetailsComponent } from './fsrs/fsr-details/fsr-details.component';
import { FsrListComponent } from './fsrs/fsr-list/fsr-list.component';
import { OverviewFsrComponent } from './overview/overview-fsr/overview-fsr.component';
import { OverviewTasksComponent } from './overview/overview-tasks/overview-tasks.component';
import { PartComponent } from './parts/part/part.component';
import { PartsComponent } from './parts/parts/parts.component';
import { AddTaskComponent } from './tasks/add-task/add-task.component';
import { EditTaskComponent } from './tasks/edit-task/edit-task.component';
import { TaskDetailsComponent } from './tasks/task-details/task-details.component';
import { TaskListViewComponent } from './tasks/task-list-view/task-list-view.component';
import { TaskComponent } from './tasks/task/task.component';
import { TasksComponent } from './tasks/tasks/tasks.component';
import { UserComponent } from './users/user/user.component';
import { UsersComponent } from './users/users/users.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', component: AdminDashboardComponent },
      { path: 'tasks', component: TasksComponent },
      { path: 'task/:id', component: TaskComponent },
      { path: 'add-task', component: AddTaskComponent },
      { path: 'customers', component: CustomersComponent },
      { path: 'customer/:id', component: CustomerComponent },
      { path: 'customer-form/:id', component: CustomerFormComponent },
      { path: 'customer-form/:id/:backTo', component: CustomerFormComponent },
      { path: 'parts', component: PartsComponent },
      { path: 'part/:id', component: PartComponent },
      { path: 'users', component: UsersComponent },
      { path: 'user/:id', component: UserComponent },
      { path: 'fsrs', component: FsrListComponent },
      { path: 'fsr/:id', component: FsrDetailsComponent },
      { path: 'fsr/:id/:backTo', component: FsrDetailsComponent },
      { path: 'edit-task/:id', component: EditTaskComponent },
      { path: 'chats', component: ChatsComponent },
      { path: 'chats/:id', component: ChatComponent },
      { path: 'qoutes', component: QoutesComponent },
      { path: 'qoute/:id', component: QouteComponent },
      { path: 'qoute-details/:id', component: QouteDetailsComponent },
      { path: 'view-qoute/:id', component: ViewQouteComponent },
    ],

    // { path: '', component: FiitingRoomComponent },
  },
];

export const declarations = [
  AdminComponent,
  AdminDashboardComponent,
  AdminNavComponent,
  TasksComponent,
  AddTaskComponent,
  OverviewTasksComponent,
  OverviewFsrComponent,
  CustomersComponent,
  CustomerComponent,
  UsersComponent,
  UserComponent,
  PartsComponent,
  PartComponent,
  CustomerComprossorsComponent,
  CustomerFsrComponent,
  CustomerReportsComponent,
  TaskComponent,
  FsrListComponent,
  FsrDetailsComponent,
  TaskDetailsComponent,
  TaskListViewComponent,
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
