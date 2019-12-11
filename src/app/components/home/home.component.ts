import { Component, OnInit } from '@angular/core';
import Typed from 'typed.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private typed: Typed;
  constructor() { 
  }

  ngOnInit() {
    this.typed = new Typed('#company-header', {
      stringsElement: '#typed-strings',
      autoInsertCss: true,
      cursorChar: '|',
      typeSpeed: 35,
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
      typeSpeed: 35,
      onComplete: (self : any) => {
        self.cursor.remove();
      }
    })
  }

}
