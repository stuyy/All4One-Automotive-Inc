import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { JobListing } from '../models/JobListing';
import { environment } from 'src/environments/environment';
import { NewUser } from '../components/settings/settings.component';
@Injectable({
  providedIn: 'root'
})
export class BackendService {

  public isAuthenticated: boolean = false;
  public events: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient) { 
    
  }
  public login(data) : Observable<any> {
    return this.http.post<any>(`${environment.host}/auth/login`, data, {
      responseType: 'json',
      withCredentials: true
    });
  }
  public isAuthorized() : Observable<any> {
    return this.http.get<any>(`${environment.host}/auth/authenticated`, {
      withCredentials: true
    });
  }
  public postJobListing(job) : Observable<any> {
    return this.isAuthorized().pipe(
      mergeMap(v => this.http.post(`${environment.host}/jobs/create`, job, { withCredentials: true })));
  }
  public fetchJobListing(id?) : Observable<Array<JobListing>> {
    if(id) {
      return this.http.get<Array<JobListing>>(`${environment.host}/jobs/listings/${id}`);
    }
    else {
      return this.http.get<Array<JobListing>>(`${environment.host}/jobs/listings/`);
    }
  }
  public logout() : Observable<any> {
    this.events.emit('logout')
    return this.http.get(`${environment.host}/auth/logout`, { withCredentials: true });
  }
  public createUserAccount(user : NewUser) : Observable<any> {
    console.log(user);
    return this.http.post(`${environment.host}/account/create`, user, { withCredentials: true });
  }
  public updateUserPassword(data) {
    return this.isAuthorized().pipe(
      mergeMap(v => this.http.put(`${environment.host}/account/password/update`,data, { withCredentials: true }))
    )
  }
  public requestService(data) {
    return this.http.post(`${environment.host}/services`, data, { withCredentials: true });
  }
}
