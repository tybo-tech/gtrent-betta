import { Pipe, PipeTransform } from '@angular/core';
import { OrderModel } from 'src/models/order.model';

@Pipe({
  name: 'searchFsr'
})
export class SearchFsrPipe implements PipeTransform {

  transform(fsrs: OrderModel[], val:string): OrderModel[] {
    return fsrs.filter(x=>x.Customer?.Name.toLowerCase().includes(val.toLowerCase()));
  }

}
