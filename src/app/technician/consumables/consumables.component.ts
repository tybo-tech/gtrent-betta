import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Item } from 'src/models/item.model';
import { OrderModel } from 'src/models/order.model';
import { FsrModel } from 'src/models/task.model';
import { User } from 'src/models/user.model';
import { AccountService } from 'src/services/account.service';
import { ItemService } from 'src/services/item.service';
import { ITEM_TYPES } from 'src/utits/constants';

@Component({
  selector: 'app-consumables',
  templateUrl: './consumables.component.html',
  styleUrls: ['./consumables.component.scss'],
})
export class ConsumablesComponent implements OnInit {
  @Input() fsr?: FsrModel;
  @Output() onValueChanged = new EventEmitter<any>();
  @Output() onBack = new EventEmitter<any>();
  @Input() label = 'Select Type';
  @Input() label2 = 'Edit price';
  @Input() inputType = 'consumables';
  val = 0;
  type = '';
  user?: User;
  allItmes: Item[] = [];
  labourItems: Item[] = [];
  consumables: Item[] = [];
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
  updatePrice(e:any){
    this.onValueChanged.emit();
  }
  save() {
    if (!this.fsr) return;
    const id = this.fsr.Consumables.length + 1;
    this.fsr.Consumables.push({ Id: id, Name: this.name, Price: this.val });
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
        this.consumables = this.allItmes.filter(
          (x) => x.ItemType === ITEM_TYPES.CONSUMABLES.Name
        );
        console.log(this.consumables);
        console.log(this.labourItems);

        // if (this.allItmes && this.service && this.service.Items) {
        //   this.allItmes.forEach((item) => {
        //     if ( this.service  && this.service.Items?.find((x) => x.ItemId === item.ItemId))
        //       item.Selected = true;
        //     else item.Selected = false;
        //   });
        // }
        // this.labourItems = this.allItmes.filter(
        //   (x) => x.ItemType === ITEM_TYPES.LABOUR.Name
        // );
        // this.consumables = this.allItmes.filter(
        //   (x) => x.ItemType === ITEM_TYPES.CONSUMABLES.Name
        // );
      });
  }
  inputChanged(){
    const item  = this.consumables.find(x=>x.ItemId === this.type)
    if(item){
      this.name = item.Name || '';
      this.val = item.Price || 0;
    }
  }
}
