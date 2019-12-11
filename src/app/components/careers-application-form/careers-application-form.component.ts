import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

@Component({
  selector: 'app-careers-application-form',
  templateUrl: './careers-application-form.component.html',
  styleUrls: ['./careers-application-form.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})
export class CareersApplicationFormComponent implements OnInit {

  fullName: FormGroup;
  emailAddress: FormGroup;
  phoneNumber: FormGroup;
  attachments: FormGroup;
  comments: FormGroup;
  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.fullName = this._formBuilder.group({
      fullName: ['', Validators.required]
    });
    this.emailAddress = this._formBuilder.group({
      emailAddress: ['', Validators.required]
    });
    this.phoneNumber = this._formBuilder.group({
      phoneNumber: ['', Validators.required]
    });
    this.attachments = this._formBuilder.group({
      attachments: ['', Validators.required]
    })
    this.comments = this._formBuilder.group({
      comments: ['', Validators.required]
    })
  }

}
