import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserLoginService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
})
export class UserLoginFormComponent implements OnInit {
  @Input() loginData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: UserLoginService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}

  // Function responsible for sending the login form inputs to the backend
  loginUser(): void {
    this.fetchApiData.userLogin(this.loginData).subscribe(
      (result) => {
        localStorage.setItem('user', JSON.stringify(result.user.Username));
        localStorage.setItem('token', result.token);
        // Logic for successful login goes here
        this.dialogRef.close(); // Close the modal on success
        this.snackBar.open('Login successful!', 'OK', {
          duration: 2000,
        });
        // navigates to /movies after successful login
        this.router.navigate(['movies']);
      },
      (error) => {
        this.snackBar.open('Login failed. Please try again.', 'OK', {
          duration: 2000,
        });
      }
    );
  }

  // Close the dialog
  closeDialog(): void {
    this.dialogRef.close();
  }
}
