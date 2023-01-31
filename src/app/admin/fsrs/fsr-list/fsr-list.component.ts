import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getStatusClass } from 'src/app/shared/helpers/task.helper';
import { OrderModel } from 'src/models/order.model';
import {
  TabModel,
  ListItemModel,
  ListItemEventModel,
} from 'src/models/shared.model';
import { TaskModel } from 'src/models/task.model';
import { User } from 'src/models/user.model';
import { AccountService } from 'src/services/account.service';
import { FsrService } from 'src/services/order.service';
import { TaskService } from 'src/services/task.service';
import { UserService } from 'src/services/user.service';
import { UxService } from 'src/services/ux.service';
import { FSR_STATUS } from 'src/utits/constants';

@Component({
  selector: 'app-fsr-list',
  templateUrl: './fsr-list.component.html',
  styleUrls: ['./fsr-list.component.scss'],
})
export class FsrListComponent implements OnInit {
  search = ''
  tabs: TabModel[] = [
    {
      Name: FSR_STATUS.All,
      Id: 0,
      Classes: ['active'],
    },
    {
      Name: 'Pending proccessing',
      Id:1,
      Classes: [],
    },
    {
      Name: FSR_STATUS.Draft,
      Id: 55,
      Classes: [],
    },
    {
      Name: FSR_STATUS.Proccesed,
      Id: 2,
      Classes: [],
    },
  ];
  tab: TabModel = this.tabs[0];
  users: User[] = [];

  grid = { 'grid-template-columns': '15% 20% 15% 5% 20% 15%  auto' };
  headers = ['FSR Number', 'Customer', 'Date', 'Parts','Work done','Status', 'Actions'];
  fsrs: OrderModel[] = [];
  allFsrs: OrderModel[] = [];
  items: ListItemModel[] = [];
  user?: User;
  constructor(
    private fsrService: FsrService,
    private accountService: AccountService,
    private uxService: UxService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = this.accountService.currentUserValue;
    this.load();
    this.userService.userListObservable.subscribe((data) => {
      if (data?.length) this.users = data;
    });
  }

  load() {
    if (!this.user) return;
    this.fsrService.getOrders('super').subscribe((data) => {
      if (data && data.length) {
        this.fsrs = data;
        this.allFsrs = data;
        this.mapItems();
      }
    });
  }
  mapItems() {
    this.items = [];
    this.fsrs.forEach((order) => {
      this.items.push({
        Id: order.OrdersId + '',
        Col1: {
          Id: '',
          Value: `${order.OrderType}${order.OrderNo || '0000'}` || '0000',
          Type: 'text',
          ShowOptions: false,
          Editing: false,
          Classes: [],
        },
        Col2: {
          Id: '',
          Value: order.Customer?.Name || '',
          Type: 'task-type',
          ShowOptions: false,
          Editing: false,
          Classes: [],
        },
        Col3: {
          Id: '',
          Value: order.CreateDate || 'Not set',
          Type: 'date',
          ShowOptions: false,
          Editing: false,
          Classes: [],
        },
        Col4: {
          Id: '',
          Value: order.Orderproducts?.length.toString() || '0',
          Type: 'time',
          ShowOptions: false,
          Editing: false,
          Classes: [],
        },
        Col5: {
          Id: '',
          Value: order.Notes,
          Type: 'time',
          ShowOptions: false,
          Editing: false,
          Classes: [],
        },
        Col6: {
          Id: '',
          Value: order.Status,
          Type: 'status',
          ShowOptions: false,
          Editing: false,
          Classes: [getStatusClass(order.Status)],
        },

        Col7: {
          Id: order.OrdersId,
          Value: 'View Fsr',
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
  rowEvent(event: ListItemEventModel) {
    console.log('Full event', event);
    this.router.navigate([`/admin/fsr`, event.Value.Id]);
  }

  changeTab(){
    if(this.tab.Id === 'All'){
      this.fsrs = this.allFsrs;
      this.mapItems();
      return;
    }
    this.fsrs = this.allFsrs.filter(x=>Number(x.StatusId) === this.tab.Id);
    this.mapItems();
  }
}
