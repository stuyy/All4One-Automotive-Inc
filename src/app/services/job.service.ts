import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  private events: EventEmitter<any> = new EventEmitter<any>();
  constructor(private http: HttpClient) { 
  }

  deleteJob(id) {
    return this.http.delete(`${environment.host}/jobs/delete/${id}`, { withCredentials: true });
  }
  archiveJob(id) {
    return this.http.put(`${environment.host}/jobs/archive/${id}`, { withCredentials: true });
  }
  editJob(id, edits) {
    return this.http.put(`${environment.host}/jobs/edit/${id}`, { edits }, { withCredentials: true });
  }
  getJobEvents() {
    return this.events;
  }
}
