import { Component, OnInit } from '@angular/core';
import { InvoiceService } from 'src/app/services/Invoices/invoice.service';
import Invoice from 'src/app/models/Invoice';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-invoice-page',
  templateUrl: './invoice-page.component.html',
  styleUrls: ['./invoice-page.component.css']
})
export class InvoicePageComponent implements OnInit {

  public loaded: boolean = false;
  public invoices: Array<Invoice> = [];
  constructor(private invoiceService: InvoiceService) { }

  ngOnInit() {
    this.invoiceService.getInvoices().subscribe((invoices : Array<Invoice>) => {
      console.log("Hello?")
      this.loaded = true;
      this.invoices = invoices;
    }, (err: HttpErrorResponse) => {
      console.log(err);
    })
  }

}
