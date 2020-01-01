import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import { JobListing } from 'src/app/models/JobListing';
import { ActivatedRoute } from '@angular/router';
import { JobService } from 'src/app/services/job.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-jobs-page',
  templateUrl: './jobs-page.component.html',
  styleUrls: ['./jobs-page.component.css']
})
export class JobsPageComponent implements OnInit {

  public loaded: boolean = false;
  public jobListings: Array<JobListing>;
  public jobListingsMap: Map<string, JobListing>;
  public displayJobApplication: boolean = false;
  public jobListing: JobListing;
  public auth: boolean = false;
  public accountType: string;
  constructor(
    private backendService: BackendService,
    private route: ActivatedRoute,
    private jobService: JobService,
    private snackbar: MatSnackBar
  ) { 
    this.jobService.getJobEvents().subscribe(event => {
      console.log(event);
      if(event.name === 'jobDelete') {
        this.jobListingsMap.delete(event.id);
        this.snackbar.open('Job deleted', 'close', {
          duration: 5000
        })
      } else if(event.name === 'jobEdit') {
        
      }
    })
  }
  ngOnInit() {
    this.backendService.fetchJobListing()
      .subscribe((jobs : Array<JobListing>) => {
        this.jobListingsMap = new Map<string, JobListing>(jobs.map(job => [job._id, job]));
      }, err => console.log(err),
      () => this.loaded = true);

    this.route.paramMap.subscribe(route => {
      if(route.get('id')) {
        let id = route.get('id')
        this.backendService.fetchJobListing(id)
          .subscribe((data : Array<JobListing>) => {
            this.jobListings = data;
            this.displayJobApplication = true;
            this.jobListing = this.jobListings[0];
          }, err => console.log(err));
      }
    });

    this.backendService.isAuthorized().subscribe((res) => {
      console.log(res)
      this.auth = true;
      this.accountType = res.type;
    }, err => this.auth = false)
  }
  get jobs () : Array<JobListing> {
    return Array.from(this.jobListingsMap.values())
  }
}
