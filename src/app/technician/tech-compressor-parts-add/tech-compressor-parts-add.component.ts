import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Machine } from 'src/models/machine.model';
import { Product } from 'src/models/product.model';
import { User } from 'src/models/user.model';
import { AccountService } from 'src/services/account.service';
import { ProductService } from 'src/services/product.service';
import { UxService } from 'src/services/ux.service';

@Component({
  selector: 'app-tech-compressor-parts-add',
  templateUrl: './tech-compressor-parts-add.component.html',
  styleUrls: ['./tech-compressor-parts-add.component.scss']
})
export class TechCompressorPartsAddComponent implements OnInit {
  addPart = '';
  user?: User;
  products?: Product[];
  @Input() machine?: Machine;
  @Output() doneEvent: EventEmitter<Product> = new EventEmitter<Product>();
  @Output() closeEvent: EventEmitter<Product> = new EventEmitter<Product>();
  @Output() removeEvent: EventEmitter<any> = new EventEmitter<any>();
  searchString = '';
  constructor(
    private productService: ProductService,
    private acc: AccountService,
    private uxService: UxService
  ) {}

  ngOnInit(): void {
    this.user = this.acc.currentUserValue;
    if (this.machine) this.load();
  }
  close() {
    this.closeEvent.emit();
  }
  onValueChanged(p: Product){
    this.addPart = '';
    this.products?.unshift(p);
    this.selectPart(p)
  }
  load() {
    if (!this.user) return;
    this.productService.getProducts(this.user.CompanyId).subscribe((data) => {
      if (data && data.length) {
        this.uxService.updateUXState({
          Loading: false,
        });

        // this.products = data.filter(
        //   (product) => product.ProductStatus === STATUS_ACTIIVE_STRING
        // );
        if (this.machine && data) {
          data.map((x) => (x.Selected = false));
          this.machine.Parts?.forEach((part) => {
            const check = data.find((x) => x.ProductId === part.ProductId);
            if (check) {
              check.Selected = true;
            }
          });

          this.products = data;
        }
      }
    });
  }
  selectPart(part: Product) {
    if (part.Selected) {
      this.removeEvent.emit(part);
      part.Selected = false
    } else {
      this.doneEvent.emit(part);
      part.Selected = true
    }
  }

}
