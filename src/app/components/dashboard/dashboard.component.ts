import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import { Router } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { DialogOverviewComponent } from '../dialog-overview/dialog-overview.component';
import { JobListingCreatorComponent } from '../job-listing-creator/job-listing-creator.component';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private backendService : BackendService,
    private router: Router,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private jobService: JobService) {
      this.jobService.getJobEvents().subscribe(event => {
        if(event.name === 'jobSubmit')
        {
          this.dialog.closeAll();
          this.snackbar.open('Job successfully posted!')
        }
      });
  }
  ngOnInit() {
  }
  openJobEditorModal() {
    this.dialog.open(DialogOverviewComponent, {
      width: '1000px',
      data: {
        component: JobListingCreatorComponent
      }
    })
  }
  
}
