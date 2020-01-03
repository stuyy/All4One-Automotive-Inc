import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { InvoiceFormDialogComponent } from 'src/app/dialogs/invoice-form-dialog/invoice-form-dialog.component';
import { InvoiceFormComponent } from '../invoice-form/invoice-form.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-menu',
  templateUrl: './dashboard-menu.component.html',
  styleUrls: ['./dashboard-menu.component.css']
})
export class DashboardMenuComponent implements OnInit {

  constructor(private dialog: MatDialog, private router: Router) { }

  ngOnInit() {

  }
  displayInvoiceForm() : void {
    this.dialog.open(InvoiceFormDialogComponent, {
      data: {
        component: InvoiceFormComponent
      }
    })
  }
  viewInvoices() : void {
    this.router.navigate(['/invoices'])
  }
}
