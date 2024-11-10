import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@app/environment';
import { User, UserCredentials } from '@models/user.model';
import { UserRoles } from '@utils/enums/user-enums';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { STORAGE_KEYS } from '@utils/constants/local-storage-constants';

const MEDIA_TYPE = 'application/vnd.api+json';

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
    // const options = {
    //   headers: new HttpHeaders({
    //     'Content-Type': MEDIA_TYPE,
    //     Accept: MEDIA_TYPE,
    //   }),
    // };
    return this.http.post<User>(url, user);
  }
}
