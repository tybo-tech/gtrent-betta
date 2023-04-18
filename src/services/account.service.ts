import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from 'src/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private _user: BehaviorSubject<User>;
  public user: Observable<User>;
  url: string;
  hidePassword = true;
  constructor(private http: HttpClient, private router: Router) {
    let _user = localStorage.getItem('user');
    let user = undefined;
    if (_user && _user !== 'undefined') {
      user = JSON.parse(_user);
    }
    this._user = new BehaviorSubject<User>(user);
    this.user = this._user.asObservable();
    this.url = environment.API_URL;
  }

  public get currentUserValue(): User | undefined {
    return this._user.value;
  }

  updateUserState(user: User) {
    this._user.next(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  login(credentials: { email: any; password: any }): Observable<User> {
    // this._loading.next(true);
    return this.http.post<any>(
      `${this.url}/api/account/login.php`,
      credentials
    );
  }

  generateAccountActivationReturnLink(token: string) {
    return `${environment.BASE_URL}/#/sign-in?token=${token}`;
  }

  generateForgotPasswordReturnLink(token: string) {
    return `${environment.BASE_URL}/home/reset-password/${token}`;
  }

  logout(e: any = undefined) {
    this._user.next(e);
    localStorage.clear();
    this.router.navigate(['']);
  }

  refresh() {
    setInterval(() => {
      const user = this.currentUserValue;
      if (user) {
        this.http
          .get<User>(`${this.url}/api/user/get-user.php?UserId=${user.UserId}`)
          .subscribe((data) => {
            if (data) {
              this.updateUserState(data);
            }
          });
      }
    }, 10000);
  }

  refreshOnce() {
    const user = this.currentUserValue;
    if (user) {
      this.http
        .get<User>(`${this.url}/api/user/get-user.php?UserId=${user.UserId}`)
        .subscribe((data) => {
          if (data) {
            this.updateUserState(data);
          }
        });
    }
  }
}
