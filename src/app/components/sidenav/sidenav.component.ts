import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { SidenavService } from 'src/app/services/sidenav.service';
import { NavigationRoutes, Route } from 'src/app/models/NavigationRoutes';
import { BackendService } from 'src/app/services/backend.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  @ViewChild('side', { static: false }) sidenav : MatSidenav;
  public currentPath: string;
  constructor(private sidenavService: SidenavService, 
    private auth: BackendService, private router: Router) {
    router.events.subscribe((url : any) => {
      this.currentPath = router.url;
    }, err => console.log(err),
    () => console.log("Done."));

    this.auth.events.subscribe((res : any) => {
      if(res === 'logout') {
        this.routes = NavigationRoutes.filter((route : Route) => !route.protected);
      }
    })
   }

  public isAuthorized: boolean = false;
  public name: string;
  public routes = NavigationRoutes;

  ngOnInit() {
    console.log("Loading...");
    this.auth.isAuthorized().subscribe((res : any) => {
      this.name = res.name;
      console.log("Protected Routes.", this.routes);
    }, err => {
      console.log(err);
      this.isAuthorized = false;
      this.routes = this.routes.filter((route : Route) => !route.protected);
      console.log("Unprotected Routes");
      console.log(this.routes);
    })
  }
  ngAfterViewInit() {
    console.log("Sidenav was injected.")
    this.sidenavService.setSidenav(this.sidenav);
  }
  closeSidenav() {
    this.sidenavService.close();
  }
}
