import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Customer } from 'src/models/customer.model';
import { CustomerSammaryModel } from 'src/models/customer.sammary.model';
import { ListItemColModel } from 'src/models/shared.model';
import { User } from 'src/models/user.model';
import { CustomerService } from 'src/services/customer.service';
import { UserService } from 'src/services/user.service';
import { TASK_STATUS_LIST, TASK_TYPES_LIST } from 'src/utits/constants';

@Component({
  selector: 'app-col-item',
  templateUrl: './col-item.component.html',
  styleUrls: ['./col-item.component.scss'],
})
export class ColItemComponent implements OnInit {
  @Input() col?: ListItemColModel;
  @Output() colEvent = new EventEmitter<ListItemColModel>();
  users: User[] = [];
  customers: CustomerSammaryModel[] = [];
  TASK_STATUS_LIST = TASK_STATUS_LIST;
  TASK_TYPES_LIST = TASK_TYPES_LIST;
  constructor(
    private userService: UserService,
    private customerService: CustomerService,
  ) {}

  ngOnInit(): void {
    this.customerService.customersListObservable.subscribe((data) => {
      if (data?.length) this.customers = data;
    });

    this.userService.userListObservable.subscribe(data=>{
      if (data?.length) this.users = data;
    })
  }
  input(type= '') {
    if (this.col) this.colEvent.emit(this.col);
  }
}
