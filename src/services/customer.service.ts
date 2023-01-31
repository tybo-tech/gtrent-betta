import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Customer } from 'src/models/customer.model';
import { CustomerSammaryModel } from 'src/models/customer.sammary.model';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {


  private customersListBehaviorSubject: BehaviorSubject<CustomerSammaryModel[]>;
  public customersListObservable: Observable<CustomerSammaryModel[]>;

  private userBehaviorSubject: BehaviorSubject<Customer | undefined>;
  public userObservable: Observable<Customer | undefined>;
  url: string;

  constructor(
    private http: HttpClient
  ) {
    this.customersListBehaviorSubject = new BehaviorSubject<CustomerSammaryModel[]>([]);
    this.userBehaviorSubject = new BehaviorSubject<Customer|undefined>(undefined);
    this.customersListObservable = this.customersListBehaviorSubject.asObservable();
    this.userObservable = this.userBehaviorSubject.asObservable();
    this.url = environment.API_URL;
  }

  public get currentCustomerValue(): Customer| undefined {
    return this.userBehaviorSubject.value;
  }

  updateCustomersListState(grades: CustomerSammaryModel[]) {
    this.customersListBehaviorSubject.next(grades);
  }
  updateCustomerState(customer :  Customer) {
    this.userBehaviorSubject.next(customer);
  }

  getCustomers(companyId: string, userType: string) {
    this.http.get<CustomerSammaryModel[]>(`${this.url}/api/customer/get-customers.php?CompanyId=${companyId}&UserType=${userType}`).subscribe(data => {
      if (data?.length) {
        this.updateCustomersListState(data);
      }
    });
  }
  getCustomersStync(companyId: string, userType: string) {
    return this.http.get<Customer[]>(`${this.url}/api/customer/get-customers.php?CompanyId=${companyId}&UserType=${userType}`)
  }

  getCustomer(userId: string) {
    this.http.get<Customer>(`${this.url}/api/customer/get-customer.php?UserId=${userId}`).subscribe(data => {
      if (data) {
        this.updateCustomerState(data);
      }
    });
  }

  getCustomerSync(userId: string) {
    return this.http.get<Customer>(`${this.url}/api/customer/get-customer.php?UserId=${userId}`);
  }

  getCustomerByEmailandCompanyIdSync(email: string, companyId:string) {
    return this.http.get<Customer>(`${this.url}/api/customer/get-customer-by-comapny-and-email.php?Email=${email}&CompanyId=${companyId}`);
  }
  updateCustomer(customer :  Customer) {
    this.http.post<Customer>(`${this.url}/api/customer/update-customer.php`, customer).subscribe(data => {
      if (data) {
        this.updateCustomerState(data);
      }
    });
  }
  updateCustomerSync(customer :  Customer): Observable<Customer> {
    return this.http.post<Customer>(`${this.url}/api/customer/update-customer.php`, customer);
  }

  add(customer :  Customer) {
    return this.http.post<Customer>(`${this.url}/api/customer/add-customer.php`, customer);
  }
  addRange(customer :  Customer[]) {
    return this.http.post<Customer[]>(`${this.url}/api/customer/add-customer-range.php`, customer);
  }

}
