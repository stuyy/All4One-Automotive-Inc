import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-invoice-form-dialog',
  templateUrl: './invoice-form-dialog.component.html',
  styleUrls: ['./invoice-form-dialog.component.css']
})
export class InvoiceFormDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<InvoiceFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    
  }

}
