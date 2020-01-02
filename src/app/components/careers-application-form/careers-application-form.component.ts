import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { JobService } from 'src/app/services/job.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { JobListing } from 'src/app/models/JobListing';

@Component({
  selector: 'app-careers-application-form',
  templateUrl: './careers-application-form.component.html',
  styleUrls: ['./careers-application-form.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})
export class CareersApplicationFormComponent implements OnInit {

  @Input() jobListing: JobListing;
  public fullName: FormGroup;
  public email: FormGroup;
  public phoneNumber: FormGroup;
  public attachments: FormGroup;
  public comments: FormGroup;
  public questionForm: FormGroup;
  public loading: boolean = false;

  constructor(private _formBuilder: FormBuilder, 
    private jobService: JobService, 
    private snackbar: MatSnackBar,
    private dialog: MatDialog) {}

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
    });
    this.questionForm = this._formBuilder.group({
      questionOne: ['', Validators.required],
      questionTwo: ['', Validators.required],
      questionThree: ['', Validators.required]
    });
  }
  apply() {
    this.loading = true;
    this.disableForm();
    let formData = this.parseForm();
    this.jobService.applyJob(formData).subscribe(res => {
        console.log(res)
        this.enableForm();
        // this.resetForm();
        this.snackbar.open("We got your application!", "Close", {
          duration: 10000
        });
      }, err => {
        this.loading = false;
        console.log(err)
        this.enableForm();
        this.snackbar.open("Something went wrong!", "Close", {
          duration: 10000
        });
      });
  }
  getEmailError() {
    return this.email.get('email').errors.required ? 'Please enter an e-mail address' : this.email.get('email').errors.email ? 'Please enter a valid email' : '';
  }
  validatePhoneNumber(phone: FormGroup) {
    let phoneNumber : string = phone.value;
    let regex = new RegExp(/^([0-9]{3}-){2}[0-9]{4}$/);
    return regex.test(phoneNumber) ? null : { invalidPhoneNumber: true }
  }
  parseForm() : FormData {
    let formData = new FormData();
    formData.append('firstName', this.fullName.value.firstName);
    formData.append('lastName', this.fullName.value.lastName);
    formData.append('email', this.email.value.email);
    formData.append('phoneNumber', this.phoneNumber.value.phoneNumber);
    formData.append('comments', this.comments.value.comments);
    formData.append('jobId', this.jobListing._id);
    formData.append('resume', this.attachments.value.attachments._files[0], this.attachments.value.attachments._files[0].name);

    let questions = {
      questionOne: {
        question: `Tell us why you think you're a good candidiate for ${this.jobListing.jobTitle}`,
        response: this.questionForm.value.questionOne
      },
      questionTwo: {
        question: 'How many years of experience do you have in the automotive industry?',
        response: this.questionForm.value.questionTwo
      },
      questionThree: {
        question: 'What can you bring to the team?',
        response: this.questionForm.value.questionThree
      }
    }
    formData.append('questions', JSON.stringify(questions));
    return formData;
  }
  disableForm() : void  {
    this.fullName.disable();
    this.email.disable();
    this.phoneNumber.disable();
    this.attachments.disable();
    this.comments.disable();
  }
  enableForm() : void {
    this.fullName.enable();
    this.email.enable();
    this.phoneNumber.enable();
    this.attachments.enable();
    this.comments.enable();
    this.loading = false;
  }
  resetForm() : void {
    this.fullName.reset();
    this.email.reset();
    this.phoneNumber.reset();
    this.attachments.reset();
    this.comments.reset();
  }
}
