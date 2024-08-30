import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'; // Import MatDialog
import { UserProfileService } from '../fetch-api-data.service';
import { UserProfile } from './user-profile.model';
import { UpdateUserComponent } from '../update-user/update-user.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  userProfile: UserProfile | null = null;

  constructor(
    private dialog: MatDialog, // Add MatDialog to the constructor
    public fetchUserdata: UserProfileService
  ) {}

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData(): void {
    this.fetchUserdata.getUserProfile().subscribe((userProfile) => {
      this.userProfile = userProfile;
      console.log(this.userProfile);
    });
  }
  openUpdateDialog(): void {
    const dialogRef = this.dialog.open(UpdateUserComponent, {
      width: '400px',
      data: this.userProfile, // Pass current user data to dialog
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Update the displayed user data with the result from the dialog
        this.userProfile = result;
        // You may also want to reload or refetch the data from the server
      }
    });
  }
}
@Pipe({ name: 'dateFormat' })
export class DateFormatPipe implements PipeTransform {
  transform(value: Date | null): string {
    if (!value) {
      return '';
    }

    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    return new Intl.DateTimeFormat('en-US', options).format(value);
  }
}
