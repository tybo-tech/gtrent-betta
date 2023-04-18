import { Pipe, PipeTransform } from '@angular/core';
import { Customer } from 'src/models/customer.model';
import { CustomerSammaryModel } from 'src/models/customer.sammary.model';

@Pipe({
  name: 'searchCustomer'
})
export class SearchCustomerPipe implements PipeTransform {

  transform(customers: CustomerSammaryModel[], val: string): CustomerSammaryModel[] {

    if (!val) { return customers; }
    if (!customers) { return []; }
    return customers.filter(x =>
      x.Name.toLocaleLowerCase().includes(val.toLocaleLowerCase()));
  }

}
