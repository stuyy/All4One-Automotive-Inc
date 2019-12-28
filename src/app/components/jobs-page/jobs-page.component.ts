import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import { JobListing } from 'src/app/models/JobListing';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-jobs-page',
  templateUrl: './jobs-page.component.html',
  styleUrls: ['./jobs-page.component.css']
})
export class JobsPageComponent implements OnInit {

  public loaded: boolean = false;
  public jobListings: Array<JobListing>
  constructor(
    private backendService: BackendService,
    private route: ActivatedRoute
  ) { 

  }

  ngOnInit() {
    this.backendService.fetchJobListing()
      .subscribe((jobs : Array<JobListing>) => {
        this.jobListings = jobs;
      }, err => console.log(err),
      () => this.loaded = true);

    this.route.paramMap.subscribe(route => {
      if(route.get('id')) {
        let id = route.get('id')
        this.backendService.fetchJobListing(id)
          .subscribe((data : Array<JobListing>) => {
            this.jobListings = data;
          })
      }
    })
  }

}
