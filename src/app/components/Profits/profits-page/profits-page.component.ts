import { Component, OnInit } from '@angular/core';
import Profit from 'src/app/models/Profit';
import { ProfitsService } from '../profits-service/profits.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-profits-page',
  templateUrl: './profits-page.component.html',
  styleUrls: ['./profits-page.component.css']
})
export class ProfitsPageComponent implements OnInit {

  public loading: boolean = false;
  public profits: Array<Profit> = [];

  constructor(private profitsService: ProfitsService) { }

  ngOnInit() {
    this.loading = true;
    this.profitsService.getProfits()
      .subscribe((prof: Array<Profit>) => {
        this.profits = prof;
        this.loading = false;
      }, (err: HttpErrorResponse) => {
        console.log(err);
        this.loading = false;
      })
  }

}
