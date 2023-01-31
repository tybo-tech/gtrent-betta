import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Company } from 'src/models/company.model';
import { AdminStatModel } from 'src/models/shared.model';


@Injectable({
  providedIn: 'root'
})
export class CompanyService {



  url: string;

  constructor(
    private http: HttpClient
  ) {
    

    this.url = environment.API_URL;
  }

 
  getAdminStat() {
   return this.http.get<AdminStatModel>(`${this.url}/api/company/get-admin-stat.php`);
  }

  update(company: Company) {
    return this.http.post<Company>(
      `${this.url}/api/company/update-company.php`, company
    );
  }
  add(company: Company) {
    return this.http.post<Company>(
      `${this.url}/api/company/add-company.php`, company
    );
  }

}
