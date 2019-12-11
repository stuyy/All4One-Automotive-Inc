import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.css']
})
export class GoogleMapsComponent implements OnInit {

  public latitude: Number = 42.6363995;
  public longitude: Number = -73.7614378;
  
  constructor() { }
  
  ngOnInit() {
  }

}
