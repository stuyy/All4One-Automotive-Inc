import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-service-request-form',
  templateUrl: './service-request-form.component.html',
  styleUrls: ['./service-request-form.component.css']
})
export class ServiceRequestFormComponent implements OnInit {

  public serviceForm: FormGroup;

  constructor(private formBuiler: FormBuilder) { 
    this.serviceForm = this.formBuiler.group({
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
}
