import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { InvoiceFormDialogComponent } from 'src/app/components/Invoices/invoice-form-dialog/invoice-form-dialog.component';
import { InvoiceFormComponent } from '../Invoices/invoice-form/invoice-form.component';
import { Router } from '@angular/router';
import { DialogOverviewComponent } from '../dialog-overview/dialog-overview.component';
import { JobListingCreatorComponent } from '../job-listing-creator/job-listing-creator.component';
import { JobService } from 'src/app/services/job.service';
import { InvoiceService } from 'src/app/services/Invoices/invoice.service';
import Invoice from 'src/app/models/Invoice';
import { HttpErrorResponse } from '@angular/common/http';
import { ProfitsFormDialogComponent } from '../Profits/profits-form-dialog/profits-form-dialog.component';
import { ProfitsFormComponent } from '../Profits/profits-form/profits-form.component';
import { InvoiceSearchFormComponent } from '../Invoices/invoice-search-form/invoice-search-form.component';

@Component({
  selector: 'app-dashboard-menu',
  templateUrl: './dashboard-menu.component.html',
  styleUrls: ['./dashboard-menu.component.css']
})
export class DashboardMenuComponent implements OnInit {

  public invoices: number;
  constructor(private dialog: MatDialog, private router: Router, private snackbar: MatSnackBar, private jobService: JobService, private invoiceService: InvoiceService) { 
    this.jobService.getJobEvents().subscribe(event => {
      if(event.name === 'jobSubmit')
      {
        this.dialog.closeAll();
        this.snackbar.open('Job successfully posted!')
      }
    });
  }

  ngOnInit() {
    this.invoiceService.getInvoices().subscribe((invoice : Array<Invoice>) => {
      this.invoices = invoice.length;
      console.log(this.invoices)
    }, (err : HttpErrorResponse) => console.log(err))
  }
  displayInvoiceForm() : void {
    this.dialog.open(InvoiceFormDialogComponent, {
      data: { component: InvoiceFormComponent }});
  }
  displayProfitsForm() : void {
    this.dialog.open(ProfitsFormDialogComponent, {
      data: { component: ProfitsFormComponent },
      width: '550px'
    })
  }

  viewInvoices = () => this.router.navigate(['/invoices']);
  viewProfits = () => this.router.navigate(['/profits']);
  openJobListings = () => this.router.navigate(['/jobs']);

  openJobEditorModal = () => this.dialog.open(DialogOverviewComponent, 
    { width: '1000px', data: { component: JobListingCreatorComponent }});

  searchInvoices() : void {
    this.dialog.open(InvoiceFormDialogComponent, {
      data: { component: InvoiceSearchFormComponent }
    })
  }
}
