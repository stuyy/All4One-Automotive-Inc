import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';

@Component({
  selector: 'app-daily-expenses',
  templateUrl: './daily-expenses.component.html',
  styleUrls: ['./daily-expenses.component.css']
})
export class DailyExpensesComponent implements OnInit {

  public chart: Chart;

  constructor() {
    
  }

  ngOnInit() {
    let chartDoc = document.getElementById('chart');
    this.chart = new Chart(chartDoc, {
      type: 'pie',
      data: {
          labels: ['Income', 'Expenses'],
          datasets: [{
              data: [1200, 200],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
        title: {
          display: true,
          text: 'Income & Expenses',
          fontSize: 32,
          fontColor: 'red'
        },
        scales: {
          xAxes: [{
            gridLines: {
              display: false
            },
          }],
          yAxes: [{
            ticks: {
                beginAtZero: true,
                display: false
            },
            gridLines: {
              display: false
            }
          }],
        },
        legend: {
          labels: {
            fontColor: 'red',
            fontSize: 22
          }
        }
      }
    });
  }
}
