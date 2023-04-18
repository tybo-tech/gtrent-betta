import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Machine } from 'src/models/machine.model';
import { TaskModel } from 'src/models/task.model';
import { ITab } from 'src/models/ux.model';
import { MachineService } from 'src/services/machine.service';
import { TaskService } from 'src/services/task.service';
import { UxService } from 'src/services/ux.service';

@Component({
  selector: 'app-tech-compressor',
  templateUrl: './tech-compressor.component.html',
  styleUrls: ['./tech-compressor.component.scss'],
})
export class TechCompressorComponent implements OnInit {
  @Output() doneEvent: EventEmitter<Machine> = new EventEmitter<Machine>();
  @Output() closeEvent: EventEmitter<any> = new EventEmitter<any>();
  @Input() machineId: string = '';
  @Input() task?: TaskModel;
  @Input() companyId: string = '';
  machine?: Machine;
  tabs: ITab[] = [
    {
      Id: 1,
      Name: 'Basic details',
      Classes: ['active'],
    },
    {
      Id: 2,
      Name: 'Parts',
      Classes: [],
    },
  ];
  tab = this.tabs[0];
  isAdd = false;
  editComp = false;
  showDetails = true;
  showParts = false;
  constructor(
    private uxService: UxService,
    private machineService: MachineService,
    private taskService: TaskService
  ) {}

  ngOnInit() {
    if (this.machineId === 'add') {
      this.machine = this.machineService.initMachine(this.companyId);
      this.isAdd = true;
      this.editComp = true;
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
  tabAction(t: ITab) {
    this.tabs.map((x) => (x.Classes = []));
    t.Classes = ['active'];
    this.tab = t;
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
          // this.close();
          this.doneEvent.emit(data);
          this.machine = data;
          this.machineId = data.MachineId;
          this.isAdd = false;
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
  use() {
    if (this.task && this.machine) {
      this.task.ComprossorId = this.machine?.MachineId;
      this.task.Machine = this.machine;
      this.uxService.updateUXState({ Loading: true });
      this.taskService.save(this.task).subscribe((data) => {
        if (data && data.TaskId) {
          this.uxService.updateUXState({
            Loading: false,
            Toast: {
              Title: 'Success',
              Classes: ['_success'],
              Message: 'Task updated succesfully',
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
