import { Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-overview',
  templateUrl: './dialog-overview.component.html',
  styleUrls: ['./dialog-overview.component.css']
})
export class DialogOverviewComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  cancel(): void {
    this.dialogRef.close();
  }
}
