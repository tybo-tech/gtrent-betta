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
import { CustomerPipe, SearcbynamePipe } from './pipes/searcbyname.pipe';
import { TaskTimelinesComponent } from './task-timelines/task-timelines.component';
import { SearchFsrPipe } from './pipes/search-fsr.pipe';
import { TaskGroupsComponent } from './task-groups/task-groups.component';
import { TestRunComponent } from './test-run/test-run.component';
import { SearchParts, SearchUserPipe } from './pipes/search-user';
import { ImageWidgetComponent } from './image-widget/image-widget.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { SearchProductPipe } from './pipes/search-product.pipe';
import { AddPartModalComponent } from './add-part-modal/add-part-modal.component';
import { CustomerSelectorComponent } from './customer-selector/customer-selector.component';
import { CompressorSelectorComponent } from './compressor-selector/compressor-selector.component';
import { CustomerAddModalComponent } from './customer-add-modal/customer-add-modal.component';
import { MachineAddModalComponent } from './machine-add-modal/machine-add-modal.component';
import { QouteComponent } from './qoutes/qoute/qoute.component';
import { QoutesComponent } from './qoutes/qoutes/qoutes.component';
import { ChatsComponent } from './chat/chats/chats.component';
import { ChatComponent } from './chat/chat/chat.component';
import { QouteDetailsComponent } from './qoutes/qoute-details/qoute-details.component';
import { TaskCustomerComponent } from '../technician/task-customer/task-customer.component';
import { ServicePartsComponent } from '../technician/service-parts/service-parts.component';
import { LabourComponent } from '../technician/labour/labour.component';
import { ConsumablesComponent } from '../technician/consumables/consumables.component';
import { TechCompressorComponent } from '../technician/tech-compressor/tech-compressor.component';
import { TechCustomerFormComponent } from '../technician/tech-customer-form/tech-customer-form.component';
import { TechCompressorPartsComponent } from '../technician/tech-compressor-parts/tech-compressor-parts.component';
import { TechCompressorPartsAddComponent } from '../technician/tech-compressor-parts-add/tech-compressor-parts-add.component';
import { TechSelectPartsComponent } from '../technician/tech-select-parts/tech-select-parts.component';
import { ViewQouteComponent } from './qoutes/view-qoute/view-qoute.component';
import { FsrCardComponent } from '../admin/fsr-card/fsr-card.component';
import { CustomerEditModalComponent } from './customer-edit-modal/customer-edit-modal.component';
import { SearchCustomerPipe } from 'src/pipes/searchCustomer.pipe';

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
  SearchParts,
  ImageWidgetComponent,
  ConfirmComponent,
  SearchProductPipe,
  AddPartModalComponent,
  CustomerSelectorComponent,
  CustomerPipe,
  CompressorSelectorComponent,
  CustomerAddModalComponent,
  TaskCustomerComponent,
  MachineAddModalComponent,
  QouteComponent,
  QoutesComponent,
  ChatsComponent,
  ChatComponent,
  QouteDetailsComponent,
  ServicePartsComponent,
  LabourComponent,
  ConsumablesComponent,
  TechCompressorComponent,
  TechCustomerFormComponent,
  TechCompressorPartsComponent,
  TechCompressorPartsAddComponent,
  TechSelectPartsComponent,
  ViewQouteComponent,
  FsrCardComponent,
  CustomerEditModalComponent, SearchCustomerPipe
];
@NgModule({
  declarations: [...declarations, ],
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
