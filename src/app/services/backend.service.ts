import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient) { }

  public login(data) : Observable<any> {
    return this.http.post<any>('http://localhost:3450/auth/login', data, {
      responseType: 'json',
      withCredentials: true
    });
  }
}
