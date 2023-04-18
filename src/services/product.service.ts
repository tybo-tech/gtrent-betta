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

  add(product: Product) {
    return this.http.post<Product>(`${this.url}/api/product/add-product.php`, product);
  }
  update(product: Product) {
    return this.http.post<Product>(`${this.url}/api/product/update-product.php`, product);
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

  delete(Item: Item) {
    return this.http.post<Item>(`${this.url}/api/item/delete.php`, Item);
  }

  getSystemCategories(companyType: string, categoryType: string) : Observable<Category[]> {
    const params = `CompanyId=${companyType}&CategoryType=${categoryType}`;
 return   this.http.get<Category[]>(
      `${this.url}/api/companycategories/list-system-categories.php?${params}`
    )
  }

}
export interface Category {
  ProductsImages?: string[];
  CategoryId: string;
  Name: string;
  ParentId: string;
  Description: string;
  DisplayOrder: number;
  CategoryType: string;
  CompanyType: string;
  ImageUrl: string;
  PhoneBanner: string;
  IsDeleted: boolean;
  CreateDate?: string;
  CreateUserId: string;
  ModifyDate?: string;
  ModifyUserId: string;
  StatusId: number;
  IsSelected?: boolean;
  Class?: string[];
  Children?: Category[];
  Tertiary?: Category[];
  Products?: Product[];
  Picks?: Product[];
  ShowChildren?: boolean;
  IsShop?: boolean;
}
