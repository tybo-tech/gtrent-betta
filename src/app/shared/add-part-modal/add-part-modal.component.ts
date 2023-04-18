import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/models/product.model';
import { User } from 'src/models/user.model';
import { AccountService } from 'src/services/account.service';
import { ProductService } from 'src/services/product.service';
import { UxService } from 'src/services/ux.service';

@Component({
  selector: 'app-add-part-modal',
  templateUrl: './add-part-modal.component.html',
  styleUrls: ['./add-part-modal.component.scss'],
})
export class AddPartModalComponent implements OnInit {
  user?: User;
  @Input() action?: string;
  @Output() onValueChanged = new EventEmitter<Product>();

  product?: Product;
  categories: Category[] = [];

  constructor(
    private productService: ProductService,
    private accountService: AccountService,
    private uxService: UxService
  ) {}

  ngOnInit(): void {
    this.user = this.accountService.currentUserValue;
    if (this.action === 'add') this.product = this.initProduct();
    this.loadPartyTypesList();
  }
  back() {}
  saveProduct() {
    if (!this.product) return;
    this.product.ProductSlug = '';
    this.product.TotalStock = 1;
    this.uxService.updateUXState({
      Loading: true,
    });
    if (this.product.CreateDate && this.product.ProductId.length) {
      this.productService.update(this.product).subscribe((data) => {
        if (data && data.ProductId) {
          this.uxService.updateUXState({
            Loading: false,
            Toast: {
              Title: 'Product Saved',
              Message: `Info saved`,
              Classes: ['_error'],
            },
          });
          this.onValueChanged.emit(data);
        }
      });
    } else {
      this.productService.add(this.product).subscribe((data) => {
        if (data && data.ProductId) {
          this.uxService.updateUXState({
            Loading: false,
            Toast: {
              Title: 'Product Saved',
              Message: `Info saved`,
              Classes: ['_error'],
            },
          });
          this.onValueChanged.emit(data);
        }
      });
    }
  }

  loadPartyTypesList() {
    this.productService.getSystemCategories('All', 'All').subscribe((data) => {
      if (data && data.length) {
        data.sort(function (a, b) {
          var textA = b.Name.toString();
          var textB = a.Name.toString();
          return textA > textB ? -1 : textA < textB ? 1 : 0;
        });
        this.categories = data.filter((x) => Number(x.StatusId) === 1);
      }
    });
  }
  initProduct(): Product {
    return {
      ProductId: '',
      ShowRemainingItems: 6,
      Name: '',
      RegularPrice: 0,
      PriceFrom: 0,
      TotalStock: 0,
      PriceTo: 0,
      Description: '',
      ProductSlug: '',
      CatergoryId: 0,
      ParentCategoryId: 0,
      CategoryName: '',
      ParentCategoryName: '',
      ParentCategoryGuid: '',
      CategoryGuid: '',
      TertiaryCategoryGuid: '',
      TertiaryCategoryName: '',
      ReturnPolicy: '',
      FeaturedImageUrl: '',
      IsJustInTime: PRODUCT_TYPE_STOCK,
      ShowOnline: true,
      EstimatedDeliveryDays: 0,
      OrderLimit: 0,
      SupplierId: '',
      ProductType: 'Air Filter',
      ProductStatus: STATUS_ACTIIVE_STRING,
      Code: '',
      CompanyId: this.user?.CompanyId || '',
      CreateUserId: this.user?.UserId || '',
      ModifyUserId: this.user?.UserId || '',
      StatusId: 1,
    };
  }
}
export const STATUS_ACTIIVE_STRING = 'Active';
export const PRODUCT_TYPE_STOCK = 'Stock product';

export interface Category {
  ProductsImages?: string[];
  CategoryId: string;
  Name: string;
  ParentId: string;
  Description: string;
  DisplayOrder: number;
  CategoryType: string;
  CompanyType: string;
  ImageUrl: string;
  PhoneBanner: string;
  IsDeleted: boolean;
  CreateDate?: string;
  CreateUserId: string;
  ModifyDate?: string;
  ModifyUserId: string;
  StatusId: number;
  IsSelected?: boolean;
  Class?: string[];
  Children?: Category[];
  Tertiary?: Category[];
  Products?: Product[];
  Picks?: Product[];
  ShowChildren?: boolean;
  IsShop?: boolean;
}
