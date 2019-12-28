import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from './services/backend.service';

interface Route {
  name,
  url
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public name: string; 
  public currentPath: string = '';
  public links: Array<Route> = [
    {
      name: 'Home',
      url: '/'
    },
    {
      name: 'Careers',
      url: '/careers'
    }
  ];
  private authorizedRoutes: Array<Route> = [
    {
      name: 'Dashboard',
      url: '/dashboard'
    },
    {
      name: 'Settings',
      url: '/settings'
    },
    {
      name: 'Logout',
      url: '/logout'
    }
  ]
  constructor(private router: Router,
    private service: BackendService) {
    
    router.events.subscribe((url : any) => {
      this.currentPath = router.url;
      console.log(this.currentPath);
    }, err => console.log(err),
    () => console.log("Done."))
  }
  ngOnChanges() {
    console.log("Something changed")
  }
  ngOnInit() {
    this.service.isAuthorized().subscribe((data : any) => {
    this.name = data.name;
      this.links = this.links.concat(this.authorizedRoutes);
    }, err => console.log(err), () => {
      console.log("Done.");
    });
  }
  
}
