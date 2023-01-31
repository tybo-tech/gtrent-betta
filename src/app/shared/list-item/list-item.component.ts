import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  ListItemColModel,
  ListItemEventModel,
  ListItemModel,
} from 'src/models/shared.model';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
})
export class ListItemComponent implements OnInit {
  @Input() item?: ListItemModel;
  @Input() grid: any = {};
  @Output() rowEvent = new EventEmitter<ListItemEventModel>();
  constructor() {}
  ngOnInit(): void {}
  rowClick(col: ListItemColModel) {
    col.ShowOptions = true;
    //  this.rowEvent.emit(this.item)
  }
  doneEditing(col: ListItemColModel) {
    col.ShowOptions = false;
    //  this.rowEvent.emit(this.item)
  }
  colEvent(evnt: ListItemColModel) {
    console.log(evnt);
    if (!this.item) return;
    this.rowEvent.emit({ Value: this.item, Column: evnt });
  }
}
