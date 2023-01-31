import { Pipe, PipeTransform } from '@angular/core';
import { ListItemModel } from 'src/models/shared.model';

@Pipe({
  name: 'searcbyname'
})
export class SearcbynamePipe implements PipeTransform {

  transform(value: ListItemModel[], name: string): ListItemModel[]{
   return value.filter(x=>x.Col1?.Value.toLowerCase().includes(name.toLowerCase()) || x.Col2?.Value.toLowerCase().includes(name.toLowerCase()) )
  }

}
