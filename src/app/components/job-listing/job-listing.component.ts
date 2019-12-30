import { Component, OnInit, Input } from '@angular/core';
import { JobListing } from 'src/app/models/JobListing';
import { MatDialog } from '@angular/material';
import { DialogOverviewComponent } from '../dialog-overview/dialog-overview.component';
import { JobListingDialogComponent } from '../job-listing-dialog/job-listing-dialog.component';

@Component({
  selector: 'app-job-listing',
  templateUrl: './job-listing.component.html',
  styleUrls: ['./job-listing.component.css']
})
export class JobListingComponent implements OnInit {

  @Input() jobListing: JobListing;
  constructor(private dialog: MatDialog) {
    
  }

  ngOnInit() {
    
  }
  displayJob() {
    console.log(this.jobListing._id);
    this.dialog.open(JobListingDialogComponent, {
      data: {
        title: this.jobListing.jobTitle,
        quillTemplate: this.jobListing.jobDescription,
        id: this.jobListing._id
      },
      width: '90%'
    })
  }

}
