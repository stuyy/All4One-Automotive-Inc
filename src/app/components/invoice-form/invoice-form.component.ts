import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher, MatSnackBar } from '@angular/material';
import { InvoiceService } from 'src/app/services/Invoices/invoice.service';
import Invoice from 'src/app/models/Invoice';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.css']
})
export class InvoiceFormComponent implements OnInit {

  public form: FormGroup;
  public carForm: FormGroup;
  public description: FormGroup;
  public formSubmissionPending: boolean = false;
  constructor(private fb: FormBuilder, 
    private invoiceService: InvoiceService,
    private snackbar: MatSnackBar) { 
    this.form = this.fb.group({
      id: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      checkID: new FormControl('', Validators.required)
    });
    this.carForm = this.fb.group({
      make: new FormControl('', Validators.required),
      model : new FormControl('', Validators.required),
      year: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });
    this.description = this.fb.group({
      amount: new FormControl('', Validators.required),
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
      if(this.form.get('id').errors) {
        this.form.get('companyInvoiceID').markAsTouched();
        throw new Error("Form field required")
      }
      if(this.form.get('name').errors) {
        this.form.get('companyName').markAsTouched();
        throw new Error("Form field required")
      }
      if(this.form.get('checkID').errors) {
        this.form.get('checkID').markAsTouched();
        throw new Error("Form field required")
      }
      if(this.description.get('amount').errors) {
        this.description.get('amount').markAsTouched();
        throw new Error("Form field required");
      }
      this.carForm.disable();
      this.description.disable();
      this.form.disable();
      let invoice : Invoice = {
        invoiceId: this.form.get('id').value,
        companyName: this.form.get('name').value,
        checkId: this.form.get('checkID').value,
        make: this.carForm.get('make').value,
        model: this.carForm.get('model').value,
        year: this.carForm.get('year').value,
        amount: this.description.get('amount').value,
        description: this.description.get('description').value
      }
      this.invoiceService.postInvoice(invoice)
        .subscribe((res : any) => {
          console.log(res);
          this.carForm.enable();
          this.description.enable();
          this.form.enable();
          this.form.reset();
          this.carForm.reset();
          this.description.reset();
          this.formSubmissionPending = false;
          this.snackbar.open('Invoice Created!', 'Close', {
            duration: 3000,
            verticalPosition: 'top'
          })
        }, err => console.log(err))
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