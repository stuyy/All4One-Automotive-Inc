import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import Invoice from 'src/app/models/Invoice';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private http: HttpClient) { }

  postInvoice(invoice : Invoice) : Observable<any> {
    return this.http.post<Invoice>(`${environment.host}/invoice/create`, invoice, { withCredentials: true });
  }
  getInvoice(id) : Observable<Invoice> {
    return this.http.get<Invoice>(`${environment.host}/invoice/${id}`, { withCredentials: true });
  }
}
