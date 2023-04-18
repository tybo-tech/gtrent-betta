import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Email } from 'src/models/email.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  url: string;

  constructor(private http: HttpClient) {
    this.url = environment.API_URL;
  }

  sendGeneralTextEmail(data: Email): Observable<any> {
    return this.http.post<any>(`${this.url}api/email/general-email.php`, data);
  }

  sendQuickEmail(
    text: string,
    ToEmail: string,
    ToName: string,
    Subject: string,
    fromEmail = 'no-replay@gtrent.co.za',
    fromName = 'Gtrent Admin'
  ) {
    ;
    const emailToSend: Email = {
      FromEmail: fromEmail,
      FromName: fromName,
      FromPhone: '',
      ToEmail: ToEmail,
      ToName: ToName,
      Subject: Subject,
      Message: text,
    };
    this.sendGeneralTextEmail(emailToSend).subscribe((response) => {
      if (response > 0) {
      }
    });
  }
}
export const SEND_EMAIL_GENERAL_TEXT =
  'https://sizakheleholidays.co.za/api/api/general-email.php';
