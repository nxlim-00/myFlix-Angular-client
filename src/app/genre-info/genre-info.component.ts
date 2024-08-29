import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-genre-info',
  templateUrl: './genre-info.component.html',
  styleUrl: './genre-info.component.scss',
})
export class GenreInfoComponent {
  constructor(
    public dialogRef: MatDialogRef<GenreInfoComponent>,
    // pass the entire movie object to dialog as data
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  // Close the dialog
  closeDialog(): void {
    this.dialogRef.close();
  }
}
