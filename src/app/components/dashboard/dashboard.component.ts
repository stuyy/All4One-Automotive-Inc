import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private backendService : BackendService,
    private router: Router) {
    
  }

  ngOnInit() {
    this.backendService.isAuthorized()
      .subscribe(
        (res : any) => {
          
        }, 
        err => this.router.navigate(['/']));
  }
  
}
