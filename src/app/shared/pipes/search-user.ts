import { Pipe, PipeTransform } from '@angular/core';
import { ListItemModel } from 'src/models/shared.model';
import { User } from 'src/models/user.model';

@Pipe({
  name: 'searchuser',
})
export class SearchUserPipe implements PipeTransform {
  transform(value: User[], name: string): User[] {
    return value.filter(
      (x) =>
        x.Name?.toLowerCase().includes(name.toLowerCase()) ||
        x.Email?.toLowerCase().includes(name.toLowerCase())
    );
  }
}
