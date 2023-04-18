import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MachineParts } from 'src/models/machineparts.model';
import { TaskModel } from 'src/models/task.model';
import { FsrService } from 'src/services/order.service';
import { TaskService } from 'src/services/task.service';
import { UxService } from 'src/services/ux.service';

@Component({
  selector: 'app-service-parts',
  templateUrl: './service-parts.component.html',
  styleUrls: ['./service-parts.component.scss'],
})
export class ServicePartsComponent implements OnInit {
  @Input() task?: TaskModel;
  @Output() onCloseEvent = new EventEmitter<boolean>();
  @Output() onValueChanged = new EventEmitter<any>();
  showSelectParts = false;
  selectingProducts = false;
  constructor(private taskService: TaskService,private uxService: UxService) {}
  ngOnInit(): void {
    
  }

  closeModal() {
    this.onValueChanged.emit();
  }
  selectPartsEvent(e: any){
    this.showSelectParts = false;
  }
  back() {
    this.onValueChanged.emit(this.task?.Fsr.PartsUsed);
  }
  save() {
    this.onValueChanged.emit();
  }

  delete(i: number) {
    if (!this.task) return;
    this.task.Fsr.PartsUsed.splice(i, 1);
    this.saveTask();
  }

 saveTask() {
    if (!this.task) return;
    this.taskService.save(this.task).subscribe((r) => {
      if (r && r.TaskId) {
        // this.afterLoad(r);
        this.uxService.updateUXState({
          Loading: false,
          Toast: {
            Message: 'Parts used saved',
            Classes: ['_success'],
            Title: 'Changes saved',
          },
        });
      }
    });
  }
}
