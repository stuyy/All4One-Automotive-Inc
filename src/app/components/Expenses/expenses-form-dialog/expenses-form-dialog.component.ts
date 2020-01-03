import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-expenses-form-dialog',
  templateUrl: './expenses-form-dialog.component.html',
  styleUrls: ['./expenses-form-dialog.component.css']
})
export class ExpensesFormDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ExpensesFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}
    
  cancel(): void {
    this.dialogRef.close();
  }

}
