import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatRadioChange } from '@angular/material';

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
  constructor(private fb: FormBuilder) {
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
      
    }
    else if(type === 'date') {

    }
    else if(type === 'daterange') {

    }
  }
}
