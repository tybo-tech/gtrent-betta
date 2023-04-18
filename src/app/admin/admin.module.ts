import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule, declarations } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { TaskByStatusComponent } from './tasks/task-by-status/task-by-status.component';
import { TaskQuickViewComponent } from './tasks/task-quick-view/task-quick-view.component';
import { FsrCardComponent } from './fsr-card/fsr-card.component';
import { TaskBoardComponent } from './task-board/task-board.component';
import { TaskModalComponent } from './task-modal/task-modal.component';
import { CustomerFormComponent } from './customers/customer-form/customer-form.component';
import { CompressorComponent } from './compressor/compressor/compressor.component';
import { CompressorPartsComponent } from './compressor/compressor-parts/compressor-parts.component';
import { CompressorAddPartsComponent } from './compressor/compressor-add-parts/compressor-add-parts.component';
import { TaskCalendarComponent } from './task-calendar/task-calendar.component';
import { EditTaskComponent } from './tasks/edit-task/edit-task.component';



@NgModule({
  declarations: [...declarations, TaskByStatusComponent, TaskQuickViewComponent, TaskBoardComponent, TaskModalComponent, CustomerFormComponent, CompressorComponent, CompressorPartsComponent, CompressorAddPartsComponent, TaskCalendarComponent, EditTaskComponent],
  imports: [CommonModule, AdminRoutingModule, FormsModule, SharedModule],
})
export class AdminModule {}
