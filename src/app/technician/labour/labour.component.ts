import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Item } from 'src/models/item.model';
import { OrderModel } from 'src/models/order.model';
import { FsrModel } from 'src/models/task.model';
import { User } from 'src/models/user.model';
import { AccountService } from 'src/services/account.service';
import { ItemService } from 'src/services/item.service';
import { ITEM_TYPES } from 'src/utits/constants';

@Component({
  selector: 'app-labour',
  templateUrl: './labour.component.html',
  styleUrls: ['./labour.component.scss']
})
export class LabourComponent implements OnInit {

  @Input() fsr?: FsrModel;
  @Output() onValueChanged = new EventEmitter<any>();
  @Output() onBack = new EventEmitter<any>();
  @Input() label = 'Select Rate';
  @Input() label2 = 'Hours';
  @Input() inputType = 'time';
  val = '01:00';
  type = '';
  user?: User;
  allItmes: Item[] = [];
  labourItems: Item[] = [];
  editMode = false;
  name: string = '';
  constructor(
    private itemService: ItemService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.user = this.accountService.currentUserValue;
    this.getItems();
  }

  back() {
    this.onBack.emit('');
  }
  updateHours(e:any){
    this.onValueChanged.emit();
  }
  save() {
    if (!this.fsr) return;
    const id = this.fsr.Labour.length + 1;
    this.fsr.Labour.push({ Id: id, Name: this.name, Hours: this.val });
    this.editMode = false;
    this.onValueChanged.emit();
  }
  getItems() {
    if (!this.user || !this.fsr) return;
    this.itemService
      .getItems(this.user.CompanyId, ITEM_TYPES.SETTINGS.Name)
      .subscribe((data) => {
        this.allItmes = data || [];
        this.labourItems = this.allItmes.filter(
          (x) => x.ItemType === ITEM_TYPES.LABOUR.Name
        );
      });
  }
  inputChanged(){
    const item  = this.labourItems.find(x=>x.ItemId === this.type)
    if(item){
      this.name = item.Name || '';
      // this.val = item.Price || 0;
    }
  }

}
