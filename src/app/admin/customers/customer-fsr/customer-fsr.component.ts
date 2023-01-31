import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Machine } from 'src/models/machine.model';
import { OrderModel } from 'src/models/order.model';
import { ListItemModel, ListItemEventModel } from 'src/models/shared.model';

@Component({
  selector: 'app-customer-fsr',
  templateUrl: './customer-fsr.component.html',
  styleUrls: ['./customer-fsr.component.scss'],
})
export class CustomerFsrComponent implements OnInit {
  @Input() frs: OrderModel[] = [];
  grid = { 'grid-template-columns': '15% 20%  25% auto' };
  headers = ['Fsr date', 'Serial & Model', 'Work done', 'Actions'];
  items: ListItemModel[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (this.frs.length) this.mapItems();
  }
  rowEvent(event: ListItemEventModel) {
    console.log('Full event', event);
    this.router.navigate([`/admin/fsr`, event.Value.Id]);
  }
  mapItems() {
    this.frs.forEach((task) => {
      this.items.push({
        Id: task.OrdersId + '',
        Col1: {
          Id: '',
          Value: task.CreateDate+'',
          Type: 'date',
          ShowOptions: false,
          Editing: false,
          Classes: [],
        },
        Col2: {
          Id: '',
          Value: task.Serial + ' ' + task.Model || '',
          Type: 'text',
          ShowOptions: false,
          Editing: false,
          Classes: [],
        },
       
        Col3: {
          Id: '',
          Value: task.Notes,
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
