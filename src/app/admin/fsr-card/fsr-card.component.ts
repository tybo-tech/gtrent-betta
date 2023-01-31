import { Component, Input, OnInit } from '@angular/core';
import { OrderModel } from 'src/models/order.model';
import { FsrModel, TaskModel } from 'src/models/task.model';

@Component({
  selector: 'app-fsr-card',
  templateUrl: './fsr-card.component.html',
  styleUrls: ['./fsr-card.component.scss'],
})
export class FsrCardComponent implements OnInit {
  @Input() task?: TaskModel;
  @Input() totalPartsUsed: number = 0;
  constructor() {}

  ngOnInit(): void {
    if (this.task && this.task.Fsr.PartsUsed) {
      this.totalPartsUsed = 0;
      this.task.Fsr.PartsUsed.forEach((part) => {
        this.totalPartsUsed += Number(part.Quantity);
      });
    }
  }
}
