import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private http: HttpClient) { }

  deleteJob(id) {
    return this.http.delete(`${environment.host}/jobs/delete/${id}`, { withCredentials: true });
  }

  archiveJob(id) {
    return this.http.put(`${environment.host}/jobs/delete/${id}`, { withCredentials: true });
  }
}
