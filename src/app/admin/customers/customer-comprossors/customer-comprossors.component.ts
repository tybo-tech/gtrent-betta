import { Component, Input, OnInit } from '@angular/core';
import { Machine } from 'src/models/machine.model';
import { ListItemEventModel, ListItemModel } from 'src/models/shared.model';

@Component({
  selector: 'app-customer-comprossors',
  templateUrl: './customer-comprossors.component.html',
  styleUrls: ['./customer-comprossors.component.scss']
})
export class CustomerComprossorsComponent implements OnInit {
@Input() machines: Machine[] = [];
grid = { 'grid-template-columns': '20% 20%  20% auto' };
headers = ['Model', 'Serial', 'Parts', 'Actions'];
items: ListItemModel[] = [];

  constructor() { }

  ngOnInit(): void {
    if(this.machines.length)
    this.mapItems();
  }
  rowEvent(event: ListItemEventModel) {
    console.log('Full event', event);
  }
  mapItems() {
    this.machines.forEach((task) => {
      this.items.push({
        Id: task.MachineId + '',
        Col1: {
          Id: '',
          Value: task.Model,
          Type: 'text',
          ShowOptions: false,
          Editing: false,
          Classes: [],
        },
        Col2: {
          Id: '',
          Value: task.Serial || '',
          Type: 'text',
          ShowOptions: false,
          Editing: false,
          Classes: [],
        },
        Col3: {
          Id: '',
          Value: task.Parts?.length+'' || '0',
          Type: 'text',
          ShowOptions: false,
          Editing: false,
          Classes: [],
        },
    
        Col4: {
          Id: task.MachineId || '',
          Value: 'View details',
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
}
