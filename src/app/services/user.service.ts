import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '@models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    const url = `${environment.apiURL}/users`;
    return this.http.get<User[]>(url);
  }

  updateUserRole(userData: { userId: string; role: string }): Observable<any> {
    const url = `${environment.apiURL}/users/assign-role`;
    return this.http.put<any>(url, userData);
  }
}
