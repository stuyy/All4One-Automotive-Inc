import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-profits-form-dialog',
  templateUrl: './profits-form-dialog.component.html',
  styleUrls: ['./profits-form-dialog.component.css']
})
export class ProfitsFormDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ProfitsFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {

  }
  close() : void {
    this.dialogRef.close();
  }
}
