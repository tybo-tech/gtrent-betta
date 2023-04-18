import { Component, Input, OnInit } from '@angular/core';
import { Customer } from 'src/models/customer.model';
import { Machine } from 'src/models/machine.model';
import { ListItemEventModel, ListItemModel } from 'src/models/shared.model';
import { MachineService } from 'src/services/machine.service';
import { UxService } from 'src/services/ux.service';

@Component({
  selector: 'app-customer-comprossors',
  templateUrl: './customer-comprossors.component.html',
  styleUrls: ['./customer-comprossors.component.scss'],
})
export class CustomerComprossorsComponent implements OnInit {
  @Input() machines: Machine[] = [];
  @Input() customer?: Customer;
  grid = { 'grid-template-columns': 'repeat(5,20%)' };
  headers = ['Model', 'Serial','Hours', 'Parts', 'Actions'];
  items: ListItemModel[] = [];
  machineId = '';
  constructor(
    private machineService: MachineService,
    private uxService: UxService
  ) {}
  showAdd = false;
  ngOnInit(): void {
    if (this.machines.length) this.mapItems();
  }

  mapItems() {
    this.items = [];
    this.machines.forEach((machine) => {
      this.items.push({
        Id: machine.MachineId + '',
        Col1: {
          Id: machine.MachineId,
          Value: machine.Model,
          Type: 'text',
          Key: 'Model',
          ShowOptions: false,
          Editing: false,
          Classes: [],
        },
        Col2: {
          Id: machine.MachineId,
          Value: machine.Serial || '',
          Type: 'text',
          Key: 'Serial',
          ShowOptions: false,
          Editing: false,
          Classes: [],
        },
        Col3: {
          Id: machine.MachineId,
          Value: machine.Hours || '----',
          Type: 'text',
          Key: 'Hours',
          ShowOptions: false,
          Editing: false,
          Classes: [],
        },
        Col4: {
          Id: machine.MachineId,
          Value: machine.Parts?.length + '' || '0',
          Type: 'text',
          ShowOptions: false,
          Editing: false,
          Classes: [],
        },

        Col5: {
          Id: machine.MachineId,
          Value: 'Edit',
          Type: 'action',
          ShowOptions: false,
          Editing: false,
          Classes: ['link-success'],
        },
        Classes: [],
        ShowId: false,
      });
    });
  }
  closeEvent() {
    this.showAdd = false;
  }
  doneEvent(machine: Machine) {
    this.showAdd = false;
    const comp = this.machines.find((x) => x.MachineId === machine.MachineId);
    if (!comp) {
      machine.Parts = [];
      this.machines.push(machine);
    }else{
      comp.Model = machine.Model;
      comp.Serial = machine.Serial;
      comp.Hours = machine.Hours;
    }

    this.mapItems();
  }

  rowEvent(event: ListItemEventModel) {
    // debugger
    console.log('Full event', event);

    const machine = this.machines.find((x) => x.MachineId === event.Value.Id);
    if (!machine || !event?.Value) return;

    if (event.Column.Key === 'Model') machine.Model = event.Column.Value || '';
    if (event.Column.Key === 'Hours') machine.Hours = event.Column.Value || '';
    if (event.Column.Key === 'Serial') machine.Serial = event.Column.Value || '';

    if (event.Column.Type === 'action') {
      this.machineId = machine.MachineId;
      this.showAdd = true;
      return;
    }

    this.machineService.updateMachine(machine).subscribe((r) => {
      this.uxService.updateUXState({
        Loading: false,
        Toast: {
          Title: 'Saved',
          Message: `Machone updated succesfuly`,
          Classes: ['_success'],
        },
      });
    });
  }
}
