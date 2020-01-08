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
    return this.http.post<Invoice>(`${environment.host}/invoices/create`, invoice, { withCredentials: true });
  }
  getInvoice(id) : Observable<Invoice> {
    return this.http.get<Invoice>(`${environment.host}/invoices/id/${id}`, { withCredentials: true });
  }
  getInvoiceByDate(date): Observable<Invoice> {
    return this.http.get<Invoice>(`${environment.host}/invoices/date/${date}`, { withCredentials: true });
  }
  getInvoiceByDateRange(start, end): Observable<Invoice> {
    return this.http.get<Invoice>(`${environment.host}/invoices/date/${start}/${end}`, { withCredentials: true });
  }
  getInvoices() : Observable<Array<Invoice>> {
    return this.http.get<Array<Invoice>>(`${environment.host}/invoices`, { withCredentials: true });
  }
  getExpenses() : Observable<any> {
    return this.http.get(`${environment.host}/expenses`, { withCredentials: true });
  }
}
