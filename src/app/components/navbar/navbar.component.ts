import { Component, OnInit, ViewChild } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import { NavigationRoutes } from '../../models/NavigationRoutes';
import { Route } from '../../models/NavigationRoutes';
import { SidenavService } from 'src/app/services/sidenav.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public isAuthorized: boolean = false;
  public name: string;
  public routes = NavigationRoutes;
  public currentPath: string;
  constructor(
    private auth: BackendService,
    private sidenavService: SidenavService,
    private router: Router
  ) { 
    router.events.subscribe((url : any) => {
      this.currentPath = router.url;
    }, err => console.log(err),
    () => console.log("Done."));
    console.log("Yuh");
    this.auth.events.subscribe((res => {
      if(res === 'logout') {
        this.isAuthorized = false;
        this.routes = NavigationRoutes.filter((route : Route) => !route.protected);
      }
    }))
  }

  ngOnInit() {
    this.auth.isAuthorized().subscribe((res : any) => {
      this.name = res.name;
      console.log("Protected Routes.", this.routes);
      this.isAuthorized = true;
    }, err => {
      console.log(err);
      this.isAuthorized = false;
      this.routes = this.routes.filter((route : Route) => !route.protected);
      console.log("Unprotected Routes");
      console.log(this.routes);
    })
  }
  ngOnDestroy() {
    
  }
  toggleSidenav() {
    this.sidenavService.toggle();
  }
}
