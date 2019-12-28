import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { JobListing } from '../models/JobListing';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class BackendService {

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
      return this.isAuthorized().pipe(
        mergeMap(v => this.http.get<Array<JobListing>>(`${environment.host}/jobs/listings/${id}`, { withCredentials: true })));
    }
    else {
      return this.isAuthorized().pipe(
        mergeMap(v => this.http.get<Array<JobListing>>(`${environment.host}/jobs/listings/`, { withCredentials: true })));
    }
    
  }
}
