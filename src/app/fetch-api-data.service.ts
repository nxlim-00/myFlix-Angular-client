import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

// Declaring the API URL that will provide data
const apiUrl = 'https://myflixx-movie-app-2d5cece4bfb1.herokuapp.com';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlingService {
  constructor() {}

  // Method to handle HTTP errors
  protected handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred
      console.error('Client-side error:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code
      console.error(
        `Server-side error: ${error.status}, ` +
          `Error body: ${JSON.stringify(error.error)}`
      );
    }
    // Return an observable with a user-facing error message
    return throwError(
      () => new Error('Something went wrong; please try again later.')
    );
  }

  // Method to extract data from HTTP response
  protected extractResponseData(res: any): any {
    return res || {}; // Return response body or empty object if none
  }
}

@Injectable({
  providedIn: 'root',
})
export class UserRegistrationService extends ErrorHandlingService {
  constructor(private http: HttpClient) {
    super(); // Call the constructor of the parent class
  }

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
}

@Injectable({
  providedIn: 'root',
})
export class UserLoginService extends ErrorHandlingService {
  constructor(private http: HttpClient) {
    super();
  }

  // API call for user login
  public userLogin(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + '/login', userDetails, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json', // Ensure correct header for JSON content
        }),
      })
      .pipe(catchError(this.handleError));
  }
}

@Injectable({
  providedIn: 'root',
})
export class GetAllMoviesService extends ErrorHandlingService {
  constructor(private http: HttpClient) {
    super();
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
        catchError(this.handleError)
      );
  }
}
