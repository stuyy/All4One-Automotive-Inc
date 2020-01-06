import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatRadioChange } from '@angular/material';
import { ProfitsService } from '../profits-service/profits.service';
import Profit from 'src/app/models/Profit';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-profits-form',
  templateUrl: './profits-form.component.html',
  styleUrls: ['./profits-form.component.css']
})
export class ProfitsFormComponent implements OnInit {

  public form: FormGroup;
  constructor(private fb: FormBuilder, private profitsService: ProfitsService) {
    this.form = this.fb.group({ 
      quoteId: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      cash: new FormControl('', Validators.required),
      credit: new FormControl('', Validators.required),
      both: new FormControl('', Validators.required),
      description: new FormControl(''),
      taxRate: new FormControl('')
    });
    this.form.get('cash').disable();
    this.form.get('credit').disable();
    this.form.get('both').disable();

  }

  ngOnInit() {

  }
  radioChanged(event: MatRadioChange) {
    let value = event.value;
    if(value === 'cash') {
      this.form.get('cash').enable();
      this.form.get('credit').disable();
      this.form.get('both').disable();
    }
    else if(value === 'credit') {
      this.form.get('credit').enable();
      this.form.get('cash').disable();
      this.form.get('both').disable();
    }
    else if(value === 'both') {
      this.form.get('cash').enable();
      this.form.get('credit').enable();
    }
  }
  submitProfitsForm() : void {
    if(this.form.invalid) {
      throw new Error("Invalid form field.")
    }
    else {
      let { quoteId, type, description, taxRate } = this.form.value;
      let creditAmount, cashAmount, totalAmount;
      if(type === 'credit') 
        creditAmount = totalAmount = this.form.get('credit').value;
      else if(type === 'cash') 
        cashAmount = totalAmount = this.form.get('cash').value;
      else if(type === 'both') {
        creditAmount = this.form.get('credit').value;
        cashAmount = this.form.get('cash').value;
        totalAmount = creditAmount + cashAmount;
      }
      let profit: Profit = { 
        quoteId, type, cashAmount, creditAmount, totalAmount, taxRate, description
      };
      this.profitsService.postProfits(profit)
        .subscribe((response: any) => {
          console.log(response);
        }, 
        (err: HttpErrorResponse) => {
          console.log(err);
        });
    }
  }
}
