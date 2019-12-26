import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface Route {
  name,
  url
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public currentPath: string = '';
  constructor(private router: Router) {
    router.events.subscribe((url : any) => {
      this.currentPath = router.url;
      console.log(this.currentPath);
    }, err => console.log(err),
    () => console.log("Done."))
  }
  public links: Array<Route>= [
    {
      name: 'Home',
      url: '/'
    },
    {
      name: 'Careers',
      url: '/careers'
    }
  ];
}
