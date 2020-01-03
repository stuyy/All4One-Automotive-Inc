import { Component, OnInit, Input } from '@angular/core';
import Invoice from 'src/app/models/Invoice';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-invoice-item',
  templateUrl: './invoice-item.component.html',
  styleUrls: ['./invoice-item.component.css']
})
export class InvoiceItemComponent implements OnInit {

  @Input() invoice: Invoice;

  constructor() { }

  ngOnInit() {
    this.invoice.createdAt = formatDate(this.invoice.createdAt, 'dd-MM-yyyy hh:mm:ss a', 'en-US');
    console.log(this.invoice)
  }

}
