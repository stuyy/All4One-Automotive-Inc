import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
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
  public isAuthorized() : Observable<any> {
    return this.http.get<any>('http://localhost:3450/auth/authenticated', {
      withCredentials: true
    });
  }
  
  public postJobListing(job) : Observable<any> {
    return this.isAuthorized().pipe(
      mergeMap(v => this.http.post('http://localhost:3450/jobs/create', job, { withCredentials: true })));
  }
}
