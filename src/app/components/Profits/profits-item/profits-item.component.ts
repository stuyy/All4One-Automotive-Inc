import { Component, OnInit, Input } from '@angular/core';
import Profit from 'src/app/models/Profit';

@Component({
  selector: 'app-profits-item',
  templateUrl: './profits-item.component.html',
  styleUrls: ['./profits-item.component.css']
})
export class ProfitsItemComponent implements OnInit {

  @Input() profit: Profit;
  constructor() { }

  ngOnInit() {
    
  }

}
