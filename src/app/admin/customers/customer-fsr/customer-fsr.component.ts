import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Machine } from 'src/models/machine.model';
import { OrderModel } from 'src/models/order.model';
import { ListItemModel, ListItemEventModel } from 'src/models/shared.model';
import { TaskModel } from 'src/models/task.model';

@Component({
  selector: 'app-customer-fsr',
  templateUrl: './customer-fsr.component.html',
  styleUrls: ['./customer-fsr.component.scss'],
})
export class CustomerFsrComponent implements OnInit {
  @Input() tasks: TaskModel[] = [];
  @Input() backTo = ''
  grid = { 'grid-template-columns': '15% 20% 20% 25% auto' };
  headers = ['Fsr date', 'Serial & Model','Type', 'Work done', 'Actions'];
  items: ListItemModel[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (this.tasks.length) this.mapItems();
  }
  rowEvent(event: ListItemEventModel) {
    console.log('Full event', event);
    this.router.navigate([`/admin/fsr`, event.Value.Id, this.backTo]);
  }
  mapItems() {
    this.tasks.forEach((task) => {
      this.items.push({
        Id: task.TaskId + '',
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
          Value: task.Machine?.Serial + ' ' + task.Machine?.Model || '',
          Type: 'text',
          ShowOptions: false,
          Editing: false,
          Classes: [],
        },
       
        Col3: {
          Id: '',
          Value: task.Fsr?.WorkDone,
          Type: 'text',
          ShowOptions: false,
          Editing: false,
          Classes: [],
        },
        Col4: {
          Id: '',
          Value: task.TaskType,
          Type: 'text',
          ShowOptions: false,
          Editing: false,
          Classes: [],
        },
       

        Col5: {
          Id: task.TaskId+'' || '',
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
