import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatRadioChange } from '@angular/material';
import { InvoiceService } from 'src/app/services/Invoices/invoice.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-invoice-search-form',
  templateUrl: './invoice-search-form.component.html',
  styleUrls: ['./invoice-search-form.component.css']
})
export class InvoiceSearchFormComponent implements OnInit {

  public invoiceId: FormControl;
  public date: FormControl;
  public dateRange: FormGroup;

  public filter = (date: Date) => {
    return date <= new Date()
  }
  constructor(private fb: FormBuilder, private invoiceService: InvoiceService) {
    this.invoiceId = new FormControl('', Validators.required)
    this.invoiceId.disable();

    this.date = new FormControl('', Validators.required);
    this.date.disable();
    
    this.dateRange = this.fb.group({
      startDate: new FormControl('', Validators.required),
      endDate: new FormControl('', Validators.required)
    });
    this.dateRange.disable();
  }

  ngOnInit() {

  }
  checkRadioValue(event : MatRadioChange) : void {
    let value = event.value;
    if(value === 'quote') {
      this.invoiceId.enable();
      this.date.disable();
      this.dateRange.disable();
    }
    else if(value === 'date') {
      this.date.enable();
      this.invoiceId.disable();
      this.dateRange.disable();
    }
    else if(value === 'daterange') {
      this.dateRange.enable();
      this.invoiceId.disable();
      this.date.disable();
    }
  }
  searchInvoice(type) : void {
    if(type === 'id') {
      console.log(this.invoiceId.value)
      this.invoiceService.getInvoice(this.invoiceId.value)
        .subscribe((res : any) => {
          console.log(res);
        }, (err: HttpErrorResponse) => {
          console.log(err);
        })
    }
    else if(type === 'date') {
      let date: Date = this.date.value;
      this.invoiceService.getInvoiceByDate(date.toJSON().substring(0, 10))
      .subscribe((res : any) => {
        console.log(res);
      }, (err: HttpErrorResponse) => {
        console.log(err);
      })
    }
    else if(type === 'daterange') {

    }
  }
}
