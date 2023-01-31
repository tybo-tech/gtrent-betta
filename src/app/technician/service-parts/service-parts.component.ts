import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MachineParts } from 'src/models/machineparts.model';
import { TaskModel } from 'src/models/task.model';
import { FsrService } from 'src/services/order.service';

@Component({
  selector: 'app-service-parts',
  templateUrl: './service-parts.component.html',
  styleUrls: ['./service-parts.component.scss'],
})
export class ServicePartsComponent implements OnInit {
  @Input() task?: TaskModel;
  @Output() onCloseEvent = new EventEmitter<boolean>();
  @Output() onValueChanged = new EventEmitter<any>();

  selectingProducts = false;
  constructor(private fsrService: FsrService) {}
  ngOnInit(): void {
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

  closeModal() {
    this.onValueChanged.emit();
  }

  back() {
    this.onValueChanged.emit();
  }
  save() {
    this.onValueChanged.emit();
  }
  select(part: MachineParts) {
    if (part.Selected) this.pushPart(part);
    else this.popPart(part);
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
  delete(i: number) {
    if (!this.task) return;
    this.task.Fsr.PartsUsed.splice(i, 1);
  }
}
