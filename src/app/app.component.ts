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

  constructor(private router: Router) {

  }
  public links: Array<Route>= [
    {
      name: 'Home',
      url: '/'
    },
    {
      name: 'About',
      url: '/about'
    },
    {
      name: 'Careers',
      url: '/careers'
    },
    {
      name: 'Services',
      url: '/services'
    },
    {
      name: 'Contact',
      url: '/contact'
    }
  ];
}
