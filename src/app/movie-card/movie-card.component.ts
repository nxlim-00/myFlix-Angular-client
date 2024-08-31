import { Component } from '@angular/core';
import {
  GetAllMoviesService,
  UserProfileService,
} from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { SynopsisComponent } from '../synopsis/synopsis.component';
import { GenreInfoComponent } from '../genre-info/genre-info.component';
import { DirectorInfoComponent } from '../director-info/director-info.component';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent {
  movies: any[] = [];
  favoriteMovies: string[] = [];

  constructor(
    public fetchMovies: GetAllMoviesService,
    private userProfileService: UserProfileService,
    public dialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getMovies();
    this.getUserProfile(); // Fetch user's profile to get favorite movies
  }

  getMovies(): void {
    this.fetchMovies.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  // Function to open the synopsis dialog
  openSynopsisDialog(movie: any): void {
    this.dialog.open(SynopsisComponent, {
      data: movie, // Pass the entire movie object to the dialog
      width: '500px',
    });
  }

  // Function to open the genre dialog
  openGenreDialog(movie: any): void {
    this.dialog.open(GenreInfoComponent, {
      data: movie, // Pass the entire movie object to the dialog
      width: '500px',
    });
  }

  // Function to open the director dialog
  openDirectorDialog(movie: any): void {
    this.dialog.open(DirectorInfoComponent, {
      data: movie, // Pass the entire movie object to the dialog
      width: '500px',
    });
  }

  navigateToSingleMovie(movie: any): void {
    this.router.navigate(['/movies', movie.Title]); // Use the movie's ID to navigate
  }

  // Fetch the user's profile and store favorite movies
  getUserProfile(): void {
    this.userProfileService.getUserProfile().subscribe(
      (response) => {
        this.favoriteMovies = response.FavoriteMovies;
        localStorage.setItem('currentUser', JSON.stringify(response)); // Update local storage with latest user profile
      },
      (error) => {
        console.error('Failed to fetch user profile:', error);
      }
    );
  }

  // Check if a movie is a favorite
  isFavorite(movieId: string): boolean {
    return this.favoriteMovies.includes(movieId);
  }

  // Toggle favorite status of a movie
  toggleFavorite(movieId: string): void {
    if (this.isFavorite(movieId)) {
      this.userProfileService.removeFavoriteMovie(movieId).subscribe(
        () => {
          this.favoriteMovies = this.favoriteMovies.filter(
            (id) => id !== movieId
          );
          this.updateLocalStorageFavorites();
          this.snackBar.open('Movie removed from favorites!', 'OK', {
            duration: 2000,
          });
        },
        (error) => {
          console.error('Failed to remove favorite movie:', error);
        }
      );
    } else {
      this.userProfileService.addFavoriteMovie(movieId).subscribe(
        () => {
          this.favoriteMovies.push(movieId);
          this.updateLocalStorageFavorites();
          this.snackBar.open('Movie saved to favorites!', 'OK', {
            duration: 2000,
          });
        },
        (error) => {
          console.error('Failed to add favorite movie:', error);
        }
      );
    }
  }

  // Update the favorites in local storage
  updateLocalStorageFavorites(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    currentUser.FavoriteMovies = this.favoriteMovies;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  }
}
