import { Component, OnInit } from '@angular/core';
import AOS from 'aos';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  f;

  constructor() { }

  ngOnInit() {
    AOS.init();
    const TIME = 5000;
    let i = 0;
    let index = (i % 5) + 1;
    document.getElementsByClassName(`bg-${index}`)[0].classList.toggle('toggle');
    //console.log(`Setting bg-${index}'s opacity to 1.`)
    this.f = setInterval(() => {
      document.getElementsByClassName(`bg-${index}`)[0].classList.toggle('toggle');
      //console.log(`Setting bg-${index}'s opacity to 0.`)
      index = (++i % 5) + 1;
      document.getElementsByClassName(`bg-${index}`)[0].classList.toggle('toggle');
      //console.log(`Setting bg-${index}'s opacity to 1.`)
      if(i === 5) i = 0;
    }, TIME);
  }
  ngOnDestroy() {
    clearInterval(this.f);
  }
}
