import { Component, OnInit } from '@angular/core';
import { Product } from 'src/models/product.model';
import { ListItemEventModel, ListItemModel } from 'src/models/shared.model';
import { User } from 'src/models/user.model';
import { AccountService } from 'src/services/account.service';
import { ProductService } from 'src/services/product.service';
import { UxService } from 'src/services/ux.service';

@Component({
  selector: 'app-parts',
  templateUrl: './parts.component.html',
  styleUrls: ['./parts.component.scss'],
})
export class PartsComponent implements OnInit {
  products: Product[] = [];
  user?: User;
  items: ListItemModel[] = [];
  grid = { 'grid-template-columns': '30% 15% 30% auto' };
  headers = ['Name', 'Type', 'Customers', 'Actions'];

  constructor(
    private productService: ProductService,
    private ac: AccountService,
    private uxService: UxService
  ) {}

  ngOnInit(): void {
    this.user = this.ac.currentUserValue;
    if (this.user) {
      this.uxService.updateUXState({ Loading: true });
      this.productService.getProducts(this.user.CompanyId).subscribe((data) => {
        if (data?.length) {
          this.products = data;
          this.mapItems();
          this.uxService.updateUXState({ Loading: false });
        }
      });
    }
  }
  rowEvent(event: ListItemEventModel) {
    console.log('Full event', event);
  }

  mapItems() {
    this.items = [];
    this.products.forEach((pro) => {
      this.items.push({
        Id: pro.ProductId + '',
        Col1: {
          Id: '',
          Value: pro.Name,
          Type: 'text',
          ShowOptions: false,
          Editing: false,
          Classes: [],
        },
        Col2: {
          Id: '',
          Value: pro.ProductType,
          Type: 'task-type',
          ShowOptions: false,
          Editing: false,
          Classes: [],
        },
        Col3: {
          Id: '',
          Value: `${this.mapCust(pro?.Customers || [])
            ?.map((x) => x.CustomerName)
            .toString()}`,
          Type: 'task-type',
          ShowOptions: false,
          Editing: false,
          Classes: [],
        },
        Col4: {
          Id: pro.ProductId + '',
          Value: 'Full details',
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
  mapCust(array: any[]) {
    const a: any[] = [];
    array.forEach((x) => {
      if (!a.find((a) => a.CustomerName === x.CustomerName)) {
        a.push(x);
      }
    });
    return a;
  }
}
