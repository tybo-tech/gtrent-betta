import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MachineParts } from 'src/models/machineparts.model';
import { Product } from 'src/models/product.model';
import { TaskModel } from 'src/models/task.model';
import { MachineService } from 'src/services/machine.service';
import { TaskService } from 'src/services/task.service';
import { UxService } from 'src/services/ux.service';
import { STATUS_DELETED } from 'src/utits/constants';

@Component({
  selector: 'app-tech-select-parts',
  templateUrl: './tech-select-parts.component.html',
  styleUrls: ['./tech-select-parts.component.scss'],
})
export class TechSelectPartsComponent implements OnInit {
  @Input() task?: TaskModel;
  showAddParts = false;
  @Output() onCloseEvent = new EventEmitter<boolean>();
  constructor(
    private machineService: MachineService,
    private uxService: UxService,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    if (this.task && this.task.Machine) {
      // this.task.Machine.Parts = [];
    }
    this.markselected();
  }
  back() {
    this.onCloseEvent.emit();
  }

  markselected() {
    if (
      this.task &&
      this.task.Fsr.PartsUsed.length &&
      this.task.Machine &&
      this.task.Machine.Parts
    ) {
      this.task.Machine.Parts.forEach((item) => {
        const parts = this.task?.Fsr.PartsUsed.find(
          (x) => x.ProductId === item.MachinePartId
        );
        if (parts) {
          item.Selected = true;
          item.Qty = parts.Quantity;
          item.Existing = true;
        } else {
          item.Selected = false;
          item.Qty = 1;
          item.Existing = false;
        }
      });
    }
  }

  select(part: MachineParts) {
    if (part.Selected) this.pushPart(part);
    else this.popPart(part);
    this.saveTask();
  }
  popPart(part: MachineParts) {
    if (!this.task) return;
    this.task.Fsr.PartsUsed = this.task.Fsr.PartsUsed.filter(
      (x) => x.ProductId !== part.MachinePartId
    );
  }
  pushPart(part: MachineParts) {
    const p = this.task?.Fsr.PartsUsed.find(
      (x) => x.ProductId === part.MachinePartId
    );

    if (p) p.Quantity++;
    else
      this.task?.Fsr.PartsUsed.push({
        Name: part.ProductName,
        ProductId: part.MachinePartId,
        Quantity: 1,
        Type: part.ProductType,
      });
  }
  removeParts(machineparts: MachineParts) {
    machineparts.StatusId = STATUS_DELETED;
    this.machineService
      .updateMachinePartsSync(machineparts)
      .subscribe((data) => {
        // this.onDoneEvent(null, 'Part Un-Linked a Compressor.');
        if (this.task?.Machine)
          this.task.Machine.Parts =
            this.task.Machine.Parts?.filter(
              (x) => +x.StatusId != STATUS_DELETED
            ) || [];
        this.uxService.updateUXState({
          Loading: false,
          Toast: {
            Message: 'Part removed.',
            Classes: ['_danger'],
            Title: 'Removed',
          },
        });
      });
  }

  removeEvent(product: Product) {
    const item = this.task?.Machine?.Parts?.find(
      (x) => x.ProductId === product.ProductId
    );
    if (item) {
      this.removeParts(item);
    }
  }

  savePart(product: Product) {
    if (!this.task || !this.task.Machine) return;
    const item: MachineParts = {
      MachinePartId: '',
      MachineId: this.task.Machine.MachineId,
      ProductId: product.ProductId,
      CustomerId: this.task.Machine.CompanyId,
      MachineName: this.task.Machine.Name,
      ProductName: product.Name,
      CustomerName: '',
      ProductType: product.ProductType,
      CreateUserId: this.task.Machine.CreateUserId,
      ModifyUserId: this.task.Machine.CreateUserId,
      StatusId: 1,
    };
    this.machineService.addPart(item).subscribe((data) => {
      if (data && data.MachinePartId && this.task && this.task.Machine) {
        if (!this.task.Machine.Parts) this.task.Machine.Parts = [];
        this.task.Machine.Parts.push(data);
        setTimeout(() => {
          const part = this.task?.Machine?.Parts?.find(
            (x) => x.MachinePartId === data.MachinePartId
          );
          if(part){
            part.Selected = true
            this.select(part)
          }
        }, 1);
        this.select(data);
      }
      this.uxService.updateUXState({
        Loading: false,
        Toast: {
          Message: 'Part added to a compressor.',
          Classes: ['_success'],
          Title: 'Added',
        },
      });
    });
  }

  saveTask() {
    if (!this.task) return;
    this.taskService.save(this.task).subscribe((r) => {
      if (r && r.TaskId) {
        // this.afterLoad(r);
      }
    });
  }
}
