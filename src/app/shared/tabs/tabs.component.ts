import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TabModel } from 'src/models/shared.model';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements OnInit {
  @Input() tabs: TabModel[] = [];
  @Output() tabEvent = new EventEmitter<TabModel>();
  constructor() {}

  ngOnInit(): void {}
  onClick(tab: TabModel) {
    this.tabs.map((x) => (x.Classes = []));
    tab.Classes = ['active'];
    this.tabEvent.emit(tab);
  }
}
