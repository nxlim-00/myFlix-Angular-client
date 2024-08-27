import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators'; // Removed unused `map` import
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

// Declaring the API URL that will provide data for the client app
const apiUrl = 'https://myflixx-movie-app-2d5cece4bfb1.herokuapp.com';

@Injectable({
  providedIn: 'root',
})
export class UserRegistrationService {
  // Inject the HttpClient module into the constructor
  // This will provide HttpClient to the entire class, making it available via 'this.http'
  constructor(private http: HttpClient) {}

  // API call for user registration
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + '/users', userDetails, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json', // Ensure correct header for JSON content
        }),
      })
      .pipe(catchError(this.handleError)); // Handle errors using `handleError` method
  }

  // API call for user login
  public userLogin(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + '/login', userDetails, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json', // Ensure correct header for JSON content
        }),
      })
      .pipe(catchError(this.handleError)); // Handle errors using `handleError` method
  }

  // API call to get all movies
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    return this.http
      .get(apiUrl + '/movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token, // Add token to Authorization header
        }),
      })
      .pipe(
        map(this.extractResponseData), // Extract response data
        catchError(this.handleError) // Handle errors using `handleError` method
      );
  }

  // Method to handle HTTP errors
  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred
      console.error('Client-side error:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code
      console.error(
        `Server-side error: ${error.status}, ` +
          `Error body: ${JSON.stringify(error.error)}` // Convert error to string for clarity
      );
    }
    // Return an observable with a user-facing error message
    return throwError(
      () => new Error('Something went wrong; please try again later.')
    );
  }

  // Extract data from HTTP response
  private extractResponseData(res: any): any {
    return res || {}; // Return response body or empty object if none
  }
}
