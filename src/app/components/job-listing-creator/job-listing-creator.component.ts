import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
interface Job {
  title: string;
  description: string;
  deadline: string;
}
@Component({
  selector: 'app-job-listing-creator',
  templateUrl: './job-listing-creator.component.html',
  styleUrls: ['./job-listing-creator.component.css']
})
export class JobListingCreatorComponent implements OnInit {

  public input: string = '';
  public jobTitle: string = '';
  public jobTokens: Job = {
    title: '',
    description: '',
    deadline: ''
  };
  public jobDate: Date;
  public jobListingPreview: string = '';

  public jobListingForm = new FormGroup({
    jobTitle: new FormControl('', Validators.maxLength(50)),
    jobDeadline: new FormControl('', Validators.required),
    jobDescription: new FormControl('', Validators.required)
  });

  constructor(
    private backendService : BackendService, 
    private router: Router) {
    
  }
  ngOnInit() {
    this.backendService.isAuthorized()
      .subscribe(
        (res : any) => console.log(res), 
        err => console.log(err));
  }
  submit() {
    this.backendService.postJobListing(this.jobTokens)
    .subscribe((res : any) => console.log(res), err => {
      console.log(err)
      this.router.navigate(['/'])
    });
  }
  updateJobTitle() {
    this.jobTokens.title= '<h1><u>' + this.jobTitle + '</u></h1>';
    this.updatePreview();
  }
  updateDate() {
    this.jobTokens.deadline = '<h2>' + this.jobDate.toDateString() + '</h2>';
    this.updatePreview(); 
  }
  updatePreview() {
    this.jobListingPreview = this.jobTokens.title + '\n' + this.jobTokens.deadline + '\n' + this.jobTokens.description;
  }

}
