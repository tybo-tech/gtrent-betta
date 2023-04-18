import { Component, OnInit } from '@angular/core';
import { ITab } from 'src/models/ux.model';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  tabs: ITab[] = [
    {
      Id: 1,
      Name: 'Task board',
      Classes: ['active'],
    },
    {
      Id: 2,
      Name: 'Tasks Calendar',
      Classes: [],
    },
  ];
  tab = this.tabs[0];
  constructor() { }

  ngOnInit(): void {
  }
  tabAction(t: ITab) {
    this.tabs.map((x) => (x.Classes = []));
    t.Classes = ['active'];
    this.tab = t;
  }
}
