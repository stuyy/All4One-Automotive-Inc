import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatRadioChange } from '@angular/material';

@Component({
  selector: 'app-invoice-search-form',
  templateUrl: './invoice-search-form.component.html',
  styleUrls: ['./invoice-search-form.component.css']
})
export class InvoiceSearchFormComponent implements OnInit {

  public searchInvoiceForm: FormGroup;
  public choiceRadioForm: FormGroup;
  public filter = (date: Date) => {
    return date <= new Date()
  }
  constructor(private fb: FormBuilder) {
    this.choiceRadioForm = this.fb.group({

    })
    this.searchInvoiceForm = this.fb.group({
      invoiceID: new FormControl(''),
      date: new FormControl('', Validators.required)
    })
  }

  ngOnInit() {

  }
  checkRadioValue(event : MatRadioChange) : void {
    let value = event.value;
    if(value === 'quote') {

    }
    else if(value === 'date') {

    }
    else if(value === 'daterange') {

    }
  }
}
