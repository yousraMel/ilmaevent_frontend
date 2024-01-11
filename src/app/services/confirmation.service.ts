import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SubmitDialogComponent } from '../dialogs/submit-dialog/submit-dialog.component';
import { ErrorDialogComponent } from '../dialogs/error-dialog/error-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class ConfirmationService {
  constructor(private dialog: MatDialog) { }

  openSubmitDialog(message: string): void {
    this.dialog.open(SubmitDialogComponent, {
      width: '500px',
      data: { message },
    });
  }

  openErrorDialog(message: string): void {
    this.dialog.open(ErrorDialogComponent, {
      width: '500px',
      data: { message },
    });
  }
}
