import { Component, OnInit, HostBinding } from '@angular/core';
import Typed from 'typed.js';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('openCard', [
      state('closed', style({
        opacity: 0
      })),
      state('open', style({
        opacity: 1
      })),
      transition('open => closed', [
        animate('.5s')
      ]),
      transition('closed => open', [
        animate('.5s')
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {

  private typed: Typed;
  public showCard: boolean = false;
  public isOpen: boolean = false;
  public lat: Number = 42.6363995;
  public lon: Number = -73.7614378;
  constructor() { 

  }

  ngOnInit() {
    this.typed = new Typed('#company-header', {
      stringsElement: '#typed-strings',
      autoInsertCss: true,
      cursorChar: '|',
      typeSpeed: 0,
      onComplete: (self : any) => {
        self.cursor.remove();
        this.initAddressTyping();
      }
    });
  }

  initAddressTyping() {
    let y = new Typed('#address', {
      stringsElement: '#address-string',
      autoInsertCss: true,
      cursorChar: '|',
      typeSpeed: 0,
      startDelay: 1000,
      onComplete: (self : any) => {
        setTimeout(() => {
          this.toggle();
        }, 700)
      }
    })
  }
  toggle() {
    this.isOpen = !this.isOpen;
  }
}
