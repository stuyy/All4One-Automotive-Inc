import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { BackendService } from 'src/app/services/backend.service';
import { MatSnackBar } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';

interface ServiceRequest {
  serviceType: string;
  name: string;
  phoneNumber: string;
  email: string;
}
@Component({
  selector: 'app-service-request-form',
  templateUrl: './service-request-form.component.html',
  styleUrls: ['./service-request-form.component.css']
})
export class ServiceRequestFormComponent implements OnInit {

  public serviceForm: FormGroup;
  public loading: boolean = false;

  constructor(private formBuiler: FormBuilder, private service: BackendService, private snackbar: MatSnackBar) { 
    this.serviceForm = this.formBuiler.group({
      type: new FormControl('', [Validators.required]),
      fullName: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required, this.validatePhoneNumber]),
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  ngOnInit() {

  }
  validatePhoneNumber(group: FormGroup) { 
    let phone = group.value;
    let regex = new RegExp(/^([0-9]{3}-){2}[0-9]{4}$/);
    return regex.test(phone) ? null : { invalidPhoneNumber: true }
  }
  requestService() {
    if(this.serviceForm.invalid) return;
    this.loading = true;
    this.serviceForm.disable();
    let serviceRequest : ServiceRequest = this.serviceForm.value;
    this.service.requestService(serviceRequest)
      .subscribe((res : ServiceRequest) => {
        this.loading = false;
        this.serviceForm.enable();
        this.snackbar.open("We got your message! You'll hear from us shortly.", 'Close', {
          duration: 10000
        })
      }, (err : HttpErrorResponse) => {
        this.loading = false;
        this.serviceForm.enable();
        let msg;
        if(err.status === 500)
          msg = "Sorry, we couldn't get your message. Please try again.";
        else if(err.status === 422)
          msg = "Something went wrong, please check your details again";
        else if(err.status === 429)
          msg = "You're sending too many requests. Please try again in a few seconds";
        else msg = "Something went wrong. Please try again."
        this.snackbar.open(msg, 'Close', {
          duration: 10000
        })
      });
  }
}
