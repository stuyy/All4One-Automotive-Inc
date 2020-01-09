import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const TIME = 5000;
    let i = 0;
    let index = (i % 5) + 1;
    document.getElementsByClassName(`bg-${index}`)[0].classList.toggle('toggle');
    console.log(`Setting bg-${index}'s opacity to 1.`)
    setInterval(() => {
      document.getElementsByClassName(`bg-${index}`)[0].classList.toggle('toggle');
      console.log(`Setting bg-${index}'s opacity to 0.`)
      index = (++i % 5) + 1;
      document.getElementsByClassName(`bg-${index}`)[0].classList.toggle('toggle');
      console.log(`Setting bg-${index}'s opacity to 1.`)
    }, TIME);
  }

}
