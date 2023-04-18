import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {


  private userListBehaviorSubject: BehaviorSubject<User[]>;
  public userListObservable: Observable<User[]>;

  private userBehaviorSubject: BehaviorSubject<User>;
  public userObservable: Observable<User>;
  url: string;

  constructor(
    private http: HttpClient
  ) {
    this.userListBehaviorSubject = new BehaviorSubject<User[]>(JSON.parse(localStorage.getItem('usersList') ||'{}') || []);
    this.userBehaviorSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
    this.userListObservable = this.userListBehaviorSubject.asObservable();
    this.userObservable = this.userBehaviorSubject.asObservable();
    this.url = environment.API_URL;
  }

  public get currentUserValue(): User {
    return this.userBehaviorSubject.value;
  }

  updateUserListState(grades: User[]) {
    this.userListBehaviorSubject.next(grades);
    localStorage.setItem('usersList', JSON.stringify(grades));
  }
  updateUserState(user: User) {
    this.userBehaviorSubject.next(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  getUsers(companyId: string, userType: string) {
    this.http.get<User[]>(`${this.url}/api/user/get-users.php?CompanyId=${companyId}&UserType=${userType}`).subscribe(data => {
      if (data) {
        this.updateUserListState(data);
      }
    });
  }

  getAllUsers() {
    this.http.get<User[]>(`${this.url}/api/user/get-all-users.php`).subscribe(data => {
      if (data) {
        this.updateUserListState(data);
      }
    });
  }
  getUsersStync(companyId: string, userType: string) {
    return this.http.get<User[]>(`${this.url}/api/user/get-users.php?CompanyId=${companyId}&UserType=${userType}`)
  }
  getAllUsersStync(userId = '') {
    return this.http.get<User[]>(`${this.url}/api/user/get-all-users.php?UserId=${userId}`)
  }

  getUser(userId: string) {
    this.http.get<User>(`${this.url}/api/user/get-user.php?UserId=${userId}`).subscribe(data => {
      if (data) {
        this.updateUserState(data);
      }
    });
  }

  getUserSync(userId: string) {
    return this.http.get<User>(`${this.url}/api/user/get-user.php?UserId=${userId}`);
  }
  updateUser(user: User) {
    this.http.post<User>(`${this.url}/api/user/update-user.php`, user).subscribe(data => {
      if (data) {
        this.updateUserState(data);
      }
    });
  }
  updateUserSync(user: User): Observable<User> {
    return this.http.post<User>(`${this.url}/api/user/update-user.php`, user);
  }

  add(user: User) {
    return this.http.post<User>(`${this.url}/api/user/add-user.php`, user);
  }
  addUserCompany(user: User) {
    return this.http.post<User>(`${this.url}/api/user/add-user-company.php`, user);
  }



}
