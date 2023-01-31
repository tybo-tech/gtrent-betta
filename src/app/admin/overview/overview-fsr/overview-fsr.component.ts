import { Component, OnInit } from '@angular/core';
import { AdminStatModel } from 'src/models/shared.model';
import { CompanyService } from 'src/services/company.service';
import { FSR_STATUS } from 'src/utits/constants';

@Component({
  selector: 'app-overview-fsr',
  templateUrl: './overview-fsr.component.html',
  styleUrls: ['./overview-fsr.component.scss'],
})
export class OverviewFsrComponent implements OnInit {
  overview: any[] = [];
  actions: any[] = [];
  adminStat?: AdminStatModel;
  constructor(private companyService: CompanyService) {}

  ngOnInit(): void {
    this.loadStat();
  }
  loadStat() {
    this.companyService.getAdminStat().subscribe((data) => {
      if (data && data.Customers) {
        this.adminStat = data;
        this.buidleActions();
      }
    });
  }
  buidleActions() {
    if (!this.adminStat) return;
    this.overview = [
      {
        Name: FSR_STATUS.ReadyForProccesing,
        Value: this.adminStat.ActiveOrders,
        Url: '',
      },
      {
        Name: FSR_STATUS.Draft,
        Value: this.adminStat.DraftOrders,
        Url: '',
      },
      {
        Name: FSR_STATUS.Proccesed,
        Value: this.adminStat.HistoryOrders,
        Url: '',
      },
      {
        Name: 'All',
        Value: this.add(
          Number(this.adminStat.ActiveOrders),
          Number(this.adminStat.ActiveOrders),
          Number(this.adminStat.ActiveOrders)
        ),
        Url: '',
      },
    ];
  }
  add(a: number = 0, b: number = 0, c: number = 0) {
    return a + b + c;
  }
}
