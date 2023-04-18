import { Component, Input, OnInit } from '@angular/core';
import { Machine } from 'src/models/machine.model';
import { MachineParts } from 'src/models/machineparts.model';
import { Product } from 'src/models/product.model';
import { MachineService } from 'src/services/machine.service';
import { UxService } from 'src/services/ux.service';
import { STATUS_DELETED } from 'src/utits/constants';

@Component({
  selector: 'app-compressor-parts',
  templateUrl: './compressor-parts.component.html',
  styleUrls: ['./compressor-parts.component.scss'],
})
export class CompressorPartsComponent implements OnInit {
  @Input() machine?: Machine;
  showAddParts = false;
  constructor(
    private machineService: MachineService,
    private uxService: UxService
  ) {}

  ngOnInit(): void {}
  removeParts(machineparts: MachineParts) {
    machineparts.StatusId = STATUS_DELETED;
    this.machineService
      .updateMachinePartsSync(machineparts)
      .subscribe((data) => {
        // this.onDoneEvent(null, 'Part Un-Linked a Compressor.');
        if (this.machine)
          this.machine.Parts =
            this.machine.Parts?.filter((x) => +x.StatusId != STATUS_DELETED) ||
            [];
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

  addPart() {
    this.showAddParts = true;
  }
  removeEvent(product: Product) {
    const item = this.machine?.Parts?.find(
      (x) => x.ProductId === product.ProductId
    );
    if (item) {
      this.removeParts(item);
    }
  }

  savePart(product: Product) {
    if (!this.machine) return;
    const item: MachineParts = {
      MachinePartId: '',
      MachineId: this.machine.MachineId,
      ProductId: product.ProductId,
      CustomerId: this.machine.CompanyId,
      MachineName: this.machine.Name,
      ProductName: product.Name,
      CustomerName: '',
      ProductType: product.ProductType,
      CreateUserId: this.machine.CreateUserId,
      ModifyUserId: this.machine.CreateUserId,
      StatusId: 1,
    };
    this.machineService.addPart(item).subscribe((data) => {
      if (data && data.MachinePartId && this.machine) {
        if (!this.machine.Parts) this.machine.Parts = [];
        this.machine.Parts.push(data);
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
}
