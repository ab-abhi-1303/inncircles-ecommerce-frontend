import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { User, UserCredentials } from '@models/user.model';
import { UserRoles } from '@utils/enums/user-enums';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { STORAGE_KEYS } from '@utils/constants/local-storage-constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  isAuthenticated() {
    const user = this.localStorageService.getItem(STORAGE_KEYS.userSession);
    return user ? true : false;
  }

  validateUser(user: UserCredentials): Observable<User> {
    const url = `${environment.apiURL}/login`;
    return this.http.post<User>(url, user);
  }

  registerUser(user: UserCredentials): Observable<User> {
    const url = `${environment.apiURL}/users/create`;
    return this.http.post<User>(url, user);
  }
}
