import { Pipe, PipeTransform } from '@angular/core';
import { CustomerSammaryModel } from 'src/models/customer.sammary.model';
import { ListItemModel } from 'src/models/shared.model';

@Pipe({
  name: 'searcbyname',
})
export class SearcbynamePipe implements PipeTransform {
  transform(value: ListItemModel[], name: string): ListItemModel[] {
    return value.filter(
      (x) =>
        x.Col1?.Value.toLowerCase().includes(name.toLowerCase()) ||
        x.Col2?.Value.toLowerCase().includes(name.toLowerCase())
    );
  }
}

@Pipe({
  name: 'customerpipe',
})
export class CustomerPipe implements PipeTransform {
  transform(
    value: CustomerSammaryModel[],
    name: string
  ): CustomerSammaryModel[] {
    return value.filter((x) =>
      x.Name?.toLowerCase().includes(name.toLowerCase())
    );
  }
}
