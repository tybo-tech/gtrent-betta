import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderModel } from 'src/models/order.model';
import { User } from 'src/models/user.model';
import { AccountService } from 'src/services/account.service';
import { FsrService } from 'src/services/order.service';

@Component({
  selector: 'app-fsr-details',
  templateUrl: './fsr-details.component.html',
  styleUrls: ['./fsr-details.component.scss']
})
export class FsrDetailsComponent implements OnInit {
  user?: User;
  service?: OrderModel;
  orderId = '';
  totalPartsUsed: number = 0;
  constructor(
    private fsrService: FsrService,
    private accountService: AccountService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((r) => {
      this.user = this.accountService.currentUserValue;
      this.orderId = r['id'];
      if (this.orderId) this.getService();
    });
  }

  ngOnInit(): void {}
  getService() {
    this.fsrService.getOrderSync(this.orderId).subscribe((data) => {
      this.service = data;
      if(data && data.Orderproducts?.length){
        data.Orderproducts.forEach(o=>{this.totalPartsUsed+=Number(o.Quantity)})
      }
    });
  }

}
