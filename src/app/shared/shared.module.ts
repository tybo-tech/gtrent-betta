import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AllTasksComponent } from './tasks/all-tasks/all-tasks.component';
import { ViewTaskComponent } from './tasks/view-task/view-task.component';
import { TabsComponent } from './tabs/tabs.component';
import { BackComponent } from './back/back.component';
import { ListItemComponent } from './list-item/list-item.component';
import { HeadersComponent } from './headers/headers.component';
import { ProgressCircleComponent } from './progress-circle/progress-circle.component';
import { InputModalComponent } from './input-modal/input-modal.component';
import { ToastComponent } from './utils/toast/toast.component';
import { LoaderComponent } from './utils/loader/loader.component';
import { ColItemComponent } from './col-item/col-item.component';
import { TimeTackerComponent } from './time-tacker/time-tacker.component';
import { AngularSignaturePadModule } from '@almothafar/angular-signature-pad';
import { SigniturePadComponent } from './utils/signiture-pad/signiture-pad.component';
import { SignitureModalComponent } from './utils/signiture-modal/signiture-modal.component';
import { CommentsComponent } from './comments/comments.component';
import { SearcbynamePipe } from './pipes/searcbyname.pipe';
import { TaskTimelinesComponent } from './task-timelines/task-timelines.component';
import { SearchFsrPipe } from './pipes/search-fsr.pipe';
import { TaskGroupsComponent } from './task-groups/task-groups.component';
import { TestRunComponent } from './test-run/test-run.component';
import { SearchUserPipe } from './pipes/search-user';
import { ImageWidgetComponent } from './image-widget/image-widget.component';
import { ConfirmComponent } from './confirm/confirm.component';

const declarations = [
  AllTasksComponent,
  ViewTaskComponent,
  TabsComponent,
  BackComponent,
  ListItemComponent,
  HeadersComponent,
  ProgressCircleComponent,
  InputModalComponent,
  ToastComponent,
  LoaderComponent,
  ColItemComponent,
  TimeTackerComponent,
  SigniturePadComponent,
  SignitureModalComponent,
  CommentsComponent,
  SearcbynamePipe,
  TaskTimelinesComponent,
  SearchFsrPipe,
  TaskGroupsComponent,
  TestRunComponent,
  SearchUserPipe,
  ImageWidgetComponent,
  ConfirmComponent,
];
@NgModule({
  declarations: [...declarations],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    AngularSignaturePadModule,
  ],
  exports: [...declarations],
})
export class SharedModule {}
