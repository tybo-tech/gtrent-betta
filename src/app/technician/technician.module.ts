import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  TechnicianRoutingModule,
  declarations,
} from './technician-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { TestSuccessComponent } from './test-success/test-success.component';
import { TechnicainTaskBoardComponent } from './technicain-task-board/technicain-task-board.component';
import { TaskComplitedComponent } from './task-complited/task-complited.component';
import { TechCompressorPartsAddComponent } from './tech-compressor-parts-add/tech-compressor-parts-add.component';
import { TechSelectPartsComponent } from './tech-select-parts/tech-select-parts.component';
import { TechCustomerListComponent } from './tech-customer-list/tech-customer-list.component';
import { TechCustomerComponent } from './tech-customer/tech-customer.component';

@NgModule({
  declarations: [
    ...declarations,
    TestSuccessComponent,
    TechnicainTaskBoardComponent,
    TaskComplitedComponent,
    TechCustomerListComponent,
    TechCustomerComponent,
  ],
  imports: [CommonModule, TechnicianRoutingModule, FormsModule, SharedModule],
})
export class TechnicianModule {}
