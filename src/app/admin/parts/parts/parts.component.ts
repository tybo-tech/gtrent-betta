import { AfterViewInit, Component, OnInit } from '@angular/core';
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
export class PartsComponent implements OnInit, AfterViewInit {
  products: Product[] = [];
  user?: User;
  addPart = ''
  name ='';
  constructor(
    private productService: ProductService,
    private ac: AccountService,
    private uxService: UxService
  ) {}
  ngAfterViewInit(): void {
    if (this.user) {
      setTimeout(() => {
        this.load();
      }, 1);
    }
  }
  load() {
    this.uxService.updateUXState({ Loading: true });
    this.productService
      .getProducts(this.user?.CompanyId || '')
      .subscribe((data) => {
        if (data?.length) {
          this.products = data;
          this.products.forEach(product=>{
            product.CustomerName = `${this.mapCust(product?.Customers || [])
              ?.map((x) => x.CustomerName)
              .toString()}`
          })
          // this.mapItems();
          this.uxService.updateUXState({ Loading: false });
        }
      });
  }
  ngOnInit(): void {
    this.user = this.ac.currentUserValue;
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

  onValueChanged(p: Product){
    this.addPart = '';
    this.products?.unshift(p);
  }
}
