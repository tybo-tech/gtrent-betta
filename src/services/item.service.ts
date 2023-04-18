import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Item } from 'src/models/item.model';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  url: string;

  constructor(private http: HttpClient) {
    this.url = environment.API_URL;
  }

  add(Item: Item) {
    return this.http.post<Item>(`${this.url}/api/item/add-item.php`, Item);
  }
  addRange(items: Item[]) {
    return this.http.post<Item>(
      `${this.url}/api/item/add-item-range.php`,
      items
    );
  }
  updateRange(items: Item[]) {
    return this.http.post<Item[]>(
      `${this.url}/api/item/update-items-range.php`,
      items
    );
  }
  getItems(companyId: string, itemCategory: string, showChildren = false) {
    return this.http.get<Item[]>(
      `${this.url}/api/item/get-items.php?CompanyId=${companyId}&ItemCategory=${itemCategory}&ShowChildren=${showChildren}`
    );
  }
  getByParentIdAndRelated(
    parentId: string,
    relatedParentId: string,
    showChildren = false
  ) {
    return this.http.get<Item[]>(
      `${this.url}/api/item/get-by-parent-nad-related.php?ParentId=${parentId}&RelatedParentId=${relatedParentId}`
    );
  }

  getItem(ItemId: string) {
    return this.http.get<Item>(
      `${this.url}/api/item/get-by-id.php?ItemId=${ItemId}`
    );
  }

  getItemsBySubjectID(subjectId: string, gradeId: string): Observable<Item[]> {
    return this.http.get<Item[]>(
      `${this.url}/api/Item/get-Items.php?SubjectId=${subjectId}&GradeId=${gradeId}`
    );
  }
  update(Item: Item) {
    return this.http.post<Item>(`${this.url}/api/item/update-item.php`, Item);
  }
  delete(Item: Item) {
    return this.http.post<Item>(`${this.url}/api/item/delete.php`, Item);
  }
}
