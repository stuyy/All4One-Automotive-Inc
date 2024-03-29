import { Component, OnInit, Input } from '@angular/core';
import { JobListing } from 'src/app/models/JobListing';
import { MatDialog } from '@angular/material';
import { DialogOverviewComponent } from '../dialog-overview/dialog-overview.component';
import { JobListingDialogComponent } from '../job-listing-dialog/job-listing-dialog.component';
import { JobService } from 'src/app/services/job.service';
import { JobListingCreatorComponent } from '../job-listing-creator/job-listing-creator.component';
import { JobEditorDialogComponent } from '../job-editor-dialog/job-editor-dialog.component';

@Component({
  selector: 'app-job-listing',
  templateUrl: './job-listing.component.html',
  styleUrls: ['./job-listing.component.css']
})
export class JobListingComponent implements OnInit {

  @Input() jobListing: JobListing;
  @Input() accountType: string;
  constructor(private dialog: MatDialog, private jobService: JobService) {
    
  }

  ngOnInit() {
    
  }
  displayJob() {
    this.dialog.open(JobListingDialogComponent, {
      data: {
        title: this.jobListing.jobTitle,
        quillTemplate: this.jobListing.jobDescription,
        id: this.jobListing._id
      },
      width: '90%'
    })
  }
  deleteJob() {
    this.jobService.deleteJob(this.jobListing._id)
      .subscribe((res : any) => {
        console.log(res);
        this.jobService.getJobEvents().emit({ name: 'jobDelete', id: this.jobListing._id});
      }, err => console.log(err));
  }
  archiveJob() {
    this.jobService.archiveJob(this.jobListing._id)
      .subscribe((res : any) => {
        console.log(res);
      }, err => console.log(err));
  }
  editJob() {
    // Display Job Editor Component inside modal
    let dialog = this.dialog.open(JobEditorDialogComponent, {
      data: {
        component: JobListingCreatorComponent,
        jobListing: this.jobListing
      },
      height: 'auto'
    });
    this.jobService.getJobEvents().subscribe(event => {
      console.log(event)
      if(event.name === 'jobEdit') {
        dialog.close();
        this.jobService.getJobEvents().unsubscribe();
      }
      
    })
    /* 
    this.jobService.editJob(this.jobListing._id)
      .subscribe((res : any) => {
        console.log(res);
      })
    */
  }
}
