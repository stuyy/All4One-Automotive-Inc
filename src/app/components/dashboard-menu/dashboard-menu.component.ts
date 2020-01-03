import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { InvoiceFormDialogComponent } from 'src/app/dialogs/invoice-form-dialog/invoice-form-dialog.component';
import { InvoiceFormComponent } from '../Invoices/invoice-form/invoice-form.component';
import { Router } from '@angular/router';
import { DialogOverviewComponent } from '../dialog-overview/dialog-overview.component';
import { JobListingCreatorComponent } from '../job-listing-creator/job-listing-creator.component';
import { JobService } from 'src/app/services/job.service';
import { ExpensesFormDialogComponent } from '../Expenses/expenses-form-dialog/expenses-form-dialog.component';
import { ExpensesFormComponent } from '../Expenses/expenses-form/expenses-form.component';
import { InvoiceService } from 'src/app/services/Invoices/invoice.service';
import Invoice from 'src/app/models/Invoice';
import { HttpErrorResponse } from '@angular/common/http';

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
  displayExpensesForm = () => this.dialog.open(ExpensesFormDialogComponent,  
    { data: { component: ExpensesFormComponent }});
    
  viewInvoices = () => this.router.navigate(['/invoices']);
  openJobListings = () => this.router.navigate(['/jobs']);
  openJobEditorModal = () => this.dialog.open(DialogOverviewComponent, 
    { width: '1000px', data: { component: JobListingCreatorComponent }});
  viewJobApplications = () => {

  }
}
