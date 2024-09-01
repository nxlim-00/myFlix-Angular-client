import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { UserProfile } from './user-profile/user-profile.model';

/**
 * Base URL of the API.
 */
// Declaring the API URL that will provide data
const apiUrl = 'https://myflixx-movie-app-2d5cece4bfb1.herokuapp.com';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlingService {
  constructor() {}

  /**
   * Handles HTTP errors by logging the error and returning an observable with a user-facing error message.
   * @param {HttpErrorResponse} error - The HTTP error response.
   * @returns {Observable<never>} An observable that emits an error.
   */
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

  /**
   * Extracts data from HTTP response.
   * @param {any} res - The HTTP response.
   * @returns {any} The response body or an empty object.
   */
  // Method to extract data from HTTP response
  protected extractResponseData(res: any): any {
    return res || {}; // Return response body or empty object if none
  }
}

@Injectable({
  providedIn: 'root',
})
export class UserRegistrationService extends ErrorHandlingService {
  /**
   * Constructs the UserRegistrationService.
   * @param {HttpClient} http - The HTTP client for making requests.
   */

  constructor(private http: HttpClient) {
    super(); // Call the constructor of the parent class
  }

  /**
   * Registers a new user.
   * @param {any} userDetails - The details of the user to register.
   * @returns {Observable<any>} An observable of the registration response.
   */
  // API call for user registration
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + '/users', userDetails, {
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
export class UserLoginService extends ErrorHandlingService {
  /**
   * Constructs the UserLoginService.
   * @param {HttpClient} http - The HTTP client for making requests.
   */
  constructor(private http: HttpClient) {
    super();
  }

  /**
   * Logs in a user.
   * @param {any} userDetails - The details of the user to log in.
   * @returns {Observable<any>} An observable of the login response.
   */
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
  /**
   * Constructs the GetAllMoviesService.
   * @param {HttpClient} http - The HTTP client for making requests.
   */
  constructor(private http: HttpClient) {
    super();
  }

  /**
   * Retrieves all movies.
   * @returns {Observable<any>} An observable of the list of movies.
   */
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

  /**
   * Retrieves a single movie by its ID.
   * @param {string} movieId - The ID of the movie to retrieve.
   * @returns {Observable<any>} An observable of the movie details.
   */
  //API call to get single movie by id
  getSingleMovie(movieId: string): Observable<any> {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    return this.http
      .get(apiUrl + `/movies/${movieId}`, {
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

@Injectable({
  providedIn: 'root',
})
export class UserProfileService extends ErrorHandlingService {
  /**
   * Constructs the UserProfileService.
   * @param {HttpClient} http - The HTTP client for making requests.
   */
  constructor(private http: HttpClient) {
    super();
  }

  /**
   * Retrieves the current user's profile.
   * @returns {Observable<UserProfile>} An observable of the user profile.
   */
  // Get user profile data
  getUserProfile(): Observable<UserProfile> {
    const token = localStorage.getItem('token');
    const currentUserObject = JSON.parse(
      localStorage.getItem('currentUser') || '{}'
    ); // Parse the currentUser object from localStorage

    if (!currentUserObject || !currentUserObject._id) {
      // Handle case where currentUser object or ID is missing
      console.error('currentUser object or ID is missing');
      return new Observable<UserProfile>((observer) =>
        observer.error('currentUser object or ID is missing')
      );
    }

    return this.http
      .get<UserProfile>(`${apiUrl}/users/${currentUserObject.Username}`, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }),
      })
      .pipe(
        map((userProfile) => {
          // Handle potential null values or empty strings
          userProfile.Username = userProfile.Username || '';
          userProfile.Email = userProfile.Email || '';
          userProfile.Birthday = userProfile.Birthday || '';
          return userProfile;
        }),
        catchError(this.handleError)
      );
  }

  /**
   * Updates the current user's profile.
   * @param {Partial<UserProfile>} userProfile - The updated profile data.
   * @returns {Observable<UserProfile>} An observable of the updated user profile.
   */
  // Update user profile data
  updateUserProfile(
    userProfile: Partial<UserProfile>
  ): Observable<UserProfile> {
    const token = localStorage.getItem('token');
    const currentUserObject = JSON.parse(
      localStorage.getItem('currentUser') || '{}'
    );

    if (!currentUserObject || !currentUserObject._id) {
      console.error('currentUser object or ID is missing');
      return new Observable<UserProfile>((observer) =>
        observer.error('currentUser object or ID is missing')
      );
    }

    return this.http
      .put<UserProfile>(
        `${apiUrl}/users/${currentUserObject.Username}`,
        userProfile,
        {
          headers: new HttpHeaders({
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          }),
        }
      )
      .pipe(catchError(this.handleError));
  }

  /**
   * Deletes the current user's account.
   * @param {string} username - The username of the account to delete.
   * @returns {Observable<any>} An observable of the deletion response.
   */
  // Delete user account
  deleteUserAccount(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .delete(`${apiUrl}/users/${username}`, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }),
      })
      .pipe(
        catchError(this.handleError) // Use your existing error handling method
      );
  }

  /**
   * Adds a movie to the user's favorite list.
   * @param {string} movieId - The ID of the movie to add to favorites.
   * @returns {Observable<any>} An observable of the addition response.
   */
  // Add a movie to user's favorite list
  addFavoriteMovie(movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return this.http
      .post(
        `${apiUrl}/users/${currentUser.Username}/movies/${movieId}`,
        {},
        {
          headers: new HttpHeaders({
            Authorization: `Bearer ${token}`,
          }),
        }
      )
      .pipe(catchError(this.handleError));
  }

  /**
   * Removes a movie from the user's favorite list.
   * @param {string} movieId - The ID of the movie to remove from favorites.
   * @returns {Observable<any>} An observable of the removal response.
   */
  // Remove a movie from user's favorite list
  removeFavoriteMovie(movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return this.http
      .delete(`${apiUrl}/users/${currentUser.Username}/movies/${movieId}`, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        }),
      })
      .pipe(catchError(this.handleError));
  }
}
