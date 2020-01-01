import { Component, OnInit, Input, Inject, AfterViewInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { JobListing } from 'src/app/models/JobListing';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-job-editor-dialog',
  templateUrl: './job-editor-dialog.component.html',
  styleUrls: ['./job-editor-dialog.component.css']
})
export class JobEditorDialogComponent implements OnInit {

  jobDescription: FormControl;
  jobListing: JobListing;
  jobForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<JobEditorDialogComponent>,
    private jobService: JobService,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
      this.jobListing = this.data.jobListing;
      this.jobForm = this.formBuilder.group({
        jobTitle: new FormControl(this.jobListing.jobTitle, [Validators.required]),
        jobDescription: new FormControl(this.jobListing.jobDescription, [Validators.required])
      })
    //this.jobDescription = new FormControl(this.jobTemplate, [Validators.required]);
  }

  ngOnInit() {
   
  }
  submitEditJob() {
    this.jobService.editJob(this.jobListing._id, this.jobForm.value)
      .subscribe((res : any) => {
        console.log(res)
        this.jobService.getJobEvents().emit({
          name: 'jobEdit',
          oldJob: this.jobListing,
          newJob: res.job
        });
      }, err => console.log(err));
  }

}
