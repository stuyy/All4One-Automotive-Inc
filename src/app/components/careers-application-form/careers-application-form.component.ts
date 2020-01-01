import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { JobService } from 'src/app/services/job.service';
import JobApplication from 'src/app/models/JobApplication';
import { FileUploadControl, FileUploadValidators } from '@iplab/ngx-file-upload';

@Component({
  selector: 'app-careers-application-form',
  templateUrl: './careers-application-form.component.html',
  styleUrls: ['./careers-application-form.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})
export class CareersApplicationFormComponent implements OnInit {

  @Input() jobId: string;
  fullName: FormGroup;
  email: FormGroup;
  phoneNumber: FormGroup;
  attachments: FormGroup;
  comments: FormGroup;
  //files = new FileUploadControl(FileUploadValidators.filesLimit(1));
  //uploaded: Array<File> = [];

  constructor(private _formBuilder: FormBuilder, private jobService: JobService) {}

  ngOnInit() {
    this.fullName = this._formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', Validators.required]
    });
    this.email = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
    this.phoneNumber = this._formBuilder.group({
      phoneNumber: ['', [Validators.required, this.validatePhoneNumber]]
    });
    this.attachments = this._formBuilder.group({
      attachments: ['', Validators.required]
    })
    this.comments = this._formBuilder.group({
      comments: ['', Validators.required]
    })

  }
  apply() {
    let formData = new FormData();
    
    formData.append('firstName', this.fullName.value.firstName);
    formData.append('lastName', this.fullName.value.lastName);
    formData.append('email', this.email.value.email);
    formData.append('phoneNumber', this.phoneNumber.value.phoneNumber);
    formData.append('comments', this.comments.value.comments);
    formData.append('resume', this.attachments.value.attachments._files[0], this.attachments.value.attachments._files[0].name);
    this.jobService.applyJob(formData)
      .subscribe(res => console.log(res),
      err => console.log(err));
  }
  getEmailError() {
    return this.email.get('email').errors.required ? 'Please enter an e-mail address' : this.email.get('email').errors.email ? 'Please enter a valid email' : '';
  }
  validatePhoneNumber(phone: FormGroup) {
    let phoneNumber : string = phone.value;
    let regex = new RegExp(/^([0-9]{3}-){2}[0-9]{4}$/);
    console.log(phoneNumber.match(regex))
    return regex.test(phoneNumber) ? null : { invalidPhoneNumber: true }
  }
}
