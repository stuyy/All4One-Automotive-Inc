import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import Profit from 'src/app/models/Profit';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfitsService {

  constructor(private http: HttpClient) { }

  postProfits(profit: Profit) : Observable<Profit> {
    return this.http.post<Profit>(`${environment.host}/profits/create`, profit, { withCredentials: true });
  }
  getProfit(id) : Observable<Profit> {
    return this.http.get<Profit>(`${environment.host}/profits/${id}`, { withCredentials: true });
  }
  getProfits() : Observable<Array<Profit>> {
    return this.http.get<Array<Profit>>(`${environment.host}/profits`, { withCredentials: true });
  }
}
