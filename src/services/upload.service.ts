import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  url: string;

  constructor(private http: HttpClient) {
    this.url = environment.API_URL;
  }

  uploadFile(formData: any): Observable<any> {
    return this.http.post<any>(`${this.url}/api/upload/upload.php`, formData);
  }
}
