import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Item } from 'src/models/item.model';
import { Product } from 'src/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url: string;

  constructor(
    private http: HttpClient
  ) {

    this.url = environment.API_URL;
  }



  add(Item: Item) {
    return this.http.post<Item>(`${this.url}/api/product/get-products-betta.php`, Item);
  }
  addRange(items: Item[]) {
    return this.http.post<Item>(`${this.url}/api/item/add-item-range.php`, items);
  }

  getProducts(companyId: string) {
    return this.http.get<Product[]>(`${this.url}/api/product/get-products-betta.php?CompanyId=${companyId}`);
  }

  getItemsBySubjectID(subjectId: string, gradeId: string): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.url}/api/Item/get-Items.php?SubjectId=${subjectId}&GradeId=${gradeId}`)
  }
  update(Item: Item) {
    return this.http.post<Item>(`${this.url}/api/item/update-item.php`, Item);
  }
  delete(Item: Item) {
    return this.http.post<Item>(`${this.url}/api/item/delete.php`, Item);
  }



}
