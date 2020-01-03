import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.css']
})
export class InvoiceFormComponent implements OnInit {

  public form: FormGroup;
  public carForm: FormGroup;
  public description: FormGroup;
  constructor(private fb: FormBuilder) { 
    this.form = this.fb.group({
      companyInvoiceID: new FormControl('', Validators.required),
      companyName: new FormControl('', Validators.required),
      checkID: new FormControl('', Validators.required)
    });
    this.carForm = this.fb.group({
      make: new FormControl('', Validators.required),
      model : new FormControl('', Validators.required),
      year: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });
    this.description = this.fb.group({
      description: new FormControl('', Validators.required)
    })
  }

  ngOnInit() {
    
  }
  submit() {
    try {
      if(this.carForm.get('make').errors) {
        this.carForm.get('make').markAsTouched();
        throw new Error("Form field required")
      }
      if(this.carForm.get('model').errors) {
        this.carForm.get('model').markAsTouched();
        throw new Error("Form field required")
      }
      if(this.carForm.get('year').errors) {
        this.carForm.get('year').markAsTouched();
        throw new Error("Form field required")
      }
      if(this.description.get('description').errors) {
        this.description.get('description').markAsTouched();
        throw new Error("Form field required")
      }
      if(this.form.get('companyInvoiceID').errors) {
        this.form.get('companyInvoiceID').markAsTouched();
        throw new Error("Form field required")
      }
      if(this.form.get('companyName').errors) {
        this.form.get('companyName').markAsTouched();
        throw new Error("Form field required")
      }
      if(this.form.get('checkID').errors) {
        this.form.get('checkID').markAsTouched();
        throw new Error("Form field required")
      }
      console.log("Submitting")
    }
    catch(err) {
      console.log(err);
    }
  }
}

export class CustomErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null) : boolean {

  }
}