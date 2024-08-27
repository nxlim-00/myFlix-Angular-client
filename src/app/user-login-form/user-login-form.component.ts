import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
})
export class UserLoginFormComponent implements OnInit {
  @Input() loginData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  // Function responsible for sending the login form inputs to the backend
  loginUser(): void {
    this.fetchApiData.userLogin(this.loginData).subscribe(
      (result) => {
        // Logic for successful login goes here
        localStorage.setItem('token', result.token); // Save token to localStorage
        this.dialogRef.close(); // Close the modal on success
        this.snackBar.open('Login successful!', 'OK', {
          duration: 2000,
        });
      },
      (error) => {
        this.snackBar.open('Login failed. Please try again.', 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
