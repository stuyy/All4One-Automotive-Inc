import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { InvoiceService } from 'src/app/services/Invoices/invoice.service';
import Invoice from 'src/app/models/Invoice';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-daily-expenses',
  templateUrl: './daily-expenses.component.html',
  styleUrls: ['./daily-expenses.component.css']
})
export class DailyExpensesComponent implements OnInit {

  public chart: Chart;
  public profit: number;
  constructor(private invoiceService: InvoiceService) {
    
  }

  ngOnInit() {

    // Fetch invoices first

    this.invoiceService.getInvoices()
      .subscribe((invoices : Array<Invoice>) => {
        let reducer = (sum : number, invoice : Invoice) => sum + invoice.amount;
        this.profit = invoices.reduce(reducer, 0);
        this.initializeChart();
    }, (err: HttpErrorResponse) => {
      console.log(err);
    })

  }
  initializeChart() : void {
    let chartDoc = document.getElementById('chart');
    this.chart = new Chart(chartDoc, {
      type: 'pie',
      data: {
          labels: ['Income', 'Expenses'],
          datasets: [{
              data: [this.profit, 0],
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
