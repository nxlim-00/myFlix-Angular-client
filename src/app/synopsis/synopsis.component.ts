import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-synopsis',
  templateUrl: './synopsis.component.html',
  styleUrls: ['./synopsis.component.scss'],
})
export class SynopsisComponent {
  constructor(
    public dialogRef: MatDialogRef<SynopsisComponent>,
    // pass the entire movie object to dialog as data
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  // Close the dialog
  closeDialog(): void {
    this.dialogRef.close();
  }
}
