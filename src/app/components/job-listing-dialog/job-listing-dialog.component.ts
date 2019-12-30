import { Component, OnInit, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { JobListingComponent } from '../job-listing/job-listing.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-listing-dialog',
  templateUrl: './job-listing-dialog.component.html',
  styleUrls: ['./job-listing-dialog.component.css']
})
export class JobListingDialogComponent implements OnInit {

  constructor(
    public dialog: MatDialogRef<JobListingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router
  ) { }

  ngOnInit() {

  }
  cancel() : void {
    this.dialog.close();
  }
  apply() : void{
    let id = document.getElementById('jobId').innerHTML;
    console.log(id);
    this.router.navigate([`/jobs/${id}`]);
    this.dialog.close();
  }
}
