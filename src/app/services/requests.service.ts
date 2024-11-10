import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Request } from '@models/request.model';
import { User } from '@models/user.model';
import { Observable } from 'rxjs';

const MEDIA_TYPE = 'application/vnd.api+json';

@Injectable({
  providedIn: 'root',
})
export class RequestsService {
  constructor(private http: HttpClient) {}

  getUserRequests(userId: string): Observable<Request[]> {
    const url = `${environment.apiURL}/requests/${userId}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type': MEDIA_TYPE,
        Accept: MEDIA_TYPE,
      }),
    };
    return this.http.get<Request[]>(url, options);
  }

  addRequest(requestData: Request) {
    const url = `${environment.apiURL}/requests/create`;
    return this.http.post<Request>(url, requestData);
  }

  updateStatus(requestId: string, requestData: Request) {
    const url = `${environment.apiURL}/requests/${requestId}`;
    return this.http.put<Request>(url, requestData);
  }

  deleteRequest(requestId: string, userId: string) {
    const url = `${environment.apiURL}/requests/${requestId}`;
    return this.http.delete<Request>(url, { body: { userId: userId } });
  }
}
