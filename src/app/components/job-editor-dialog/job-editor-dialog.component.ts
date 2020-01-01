import { Component, OnInit, Input, Inject, AfterViewInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-job-editor-dialog',
  templateUrl: './job-editor-dialog.component.html',
  styleUrls: ['./job-editor-dialog.component.css']
})
export class JobEditorDialogComponent implements OnInit {

  jobDescription: FormControl;
  jobTemplate: string;
  jobTitle: string;
  jobForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<JobEditorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
      this.jobTemplate = this.data.template;
      this.jobTitle = this.data.jobTitle;
      this.jobForm = this.formBuilder.group({
        jobTitle: new FormControl(this.jobTitle, [Validators.required]),
        jobDescription: new FormControl(this.jobTemplate, [Validators.required])
      })
    //this.jobDescription = new FormControl(this.jobTemplate, [Validators.required]);

  }

  ngOnInit() {
   
  }


}
