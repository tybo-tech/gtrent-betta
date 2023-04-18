import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Machine } from 'src/models/machine.model';
import { MachineService } from 'src/services/machine.service';
import { UxService } from 'src/services/ux.service';

@Component({
  selector: 'app-machine-add-modal',
  templateUrl: './machine-add-modal.component.html',
  styleUrls: ['./machine-add-modal.component.scss']
})
export class MachineAddModalComponent implements OnInit {
  @Output() doneEvent: EventEmitter<Machine> = new EventEmitter<Machine>();
  @Output() closeEvent: EventEmitter<any> = new EventEmitter<any>();
  @Input() machineId: string = '';
  @Input() companyId: string = '';
  machine?: Machine;
  isAdd = false;
  constructor(
    private uxService: UxService,
    private machineService: MachineService
  ) {}

  ngOnInit() {
    if (this.machineId === 'add') {
      this.machine = this.machineService.initMachine(this.companyId);
      this.isAdd = true;
    } else {
      this.getMachine();
      this.isAdd = false;
    }
  }
  getMachine() {
    this.machineService.getMachine(this.machineId).subscribe((data) => {
      this.machine = data;
    });
  }
  save() {
    if (!this.machine) return;
    this.uxService.updateUXState({ Loading: true });
    if (this.machine.MachineId && this.machine.MachineId.length > 5) {
      this.machineService.updateMachine(this.machine).subscribe((data) => {
        if (data && data.MachineId) {
          this.close();
          this.doneEvent.emit(data);
          this.uxService.updateUXState({
            Loading: false,
            Toast: {
              Title: 'Success',
              Classes: ['_success'],
              Message: 'Compressor updated succesfully',
            },
          });
        }
      });
    } else {
      this.machineService.add(this.machine).subscribe((data) => {
        if (data && data.MachineId) {
          this.close();
          this.doneEvent.emit(data);
          this.uxService.updateUXState({
            Loading: false,
            Toast: {
              Title: 'Success',
              Classes: ['_success'],
              Message: 'Compressor created succesfully',
            },
          });
        }
      });
    }
  }

  close() {
    this.closeEvent.emit(true);
  }

}
