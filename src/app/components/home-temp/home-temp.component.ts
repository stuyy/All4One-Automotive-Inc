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
import { MatDialog } from '@angular/material';
import { DialogOverviewComponent } from '../dialog-overview/dialog-overview.component';
import { ServiceRequestFormComponent } from '../service-request-form/service-request-form.component';
@Component({
  selector: 'app-home-temp',
  templateUrl: './home-temp.component.html',
  styleUrls: ['./home-temp.component.css'],
  animations: [
    trigger('openCard', [
      state('closed', style({
        opacity: 0,
        visibility: 'hidden',
      })),
      state('open', style({
        opacity: 1,
        visibility: 'visible'
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
export class HomeTempComponent implements OnInit {

  private typed: Typed;
  public showCard: boolean = false;
  public isOpen: boolean = false;
  public lat: Number = 42.6363995;
  public lon: Number = -73.7614378;
  constructor(private dialog: MatDialog) { 

  }

  ngOnInit() {
    this.typed = new Typed('#company-header', {
      stringsElement: '#typed-strings',
      autoInsertCss: true,
      cursorChar: '|',
      typeSpeed: 50,
      onComplete: (self : any) => {
        setTimeout(() => { 
          this.toggle(); 
          self.cursor.remove();
        }, 700)
      }
    });
  }
  toggle() {
    this.isOpen = !this.isOpen;
  }
  requestService() {
    this.dialog.open(DialogOverviewComponent, {
      data: { component: ServiceRequestFormComponent, noShowButton: true }
    })
  }
}
