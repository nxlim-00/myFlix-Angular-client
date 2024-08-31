// favorite-list.component.ts
import { Component, OnInit } from '@angular/core';
import {
  GetAllMoviesService,
  UserProfileService,
} from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Movie {
  _id: string;
  Title: string;
  Description: string;
  Genre: {
    Name: string;
    Description: string;
  };
  Director: {
    Name: string;
    Bio: string;
    Birth: Date;
    Death: Date;
  };
  ImagePath: string;
  Featured: boolean;
}

@Component({
  selector: 'app-favorites', // Ensure this matches your HTML usage
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.scss'],
})
export class FavoriteListComponent implements OnInit {
  favoriteMovies: Movie[] = []; // Ensure the type is correctly defined
  favoriteMovieIds: string[] = []; // List of favorite movie IDs

  constructor(
    private movieService: GetAllMoviesService,
    private userProfileService: UserProfileService,
    private router: Router,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getFavoriteMovies();
  }

  navigateToSingleMovie(movie: any): void {
    this.router.navigate(['/movies', movie.Title]); // Use the movie's ID to navigate
  }

  // Fetch the list of favorite movies from the backend and store them
  getFavoriteMovies(): void {
    this.userProfileService.getUserProfile().subscribe(
      (response) => {
        this.favoriteMovieIds = response.FavoriteMovies || [];
        this.movieService.getAllMovies().subscribe((movies) => {
          this.favoriteMovies = movies.filter((movie: any) =>
            this.favoriteMovieIds.includes(movie._id)
          );
        });
      },
      (error) => {
        console.error('Failed to fetch favorite movies:', error);
      }
    );
  }

  // Toggle favorite status of a movie
  toggleFavorite(movieId: string): void {
    if (this.favoriteMovieIds.includes(movieId)) {
      // Remove movie from favorites
      this.userProfileService.removeFavoriteMovie(movieId).subscribe(
        () => {
          this.favoriteMovieIds = this.favoriteMovieIds.filter(
            (id) => id !== movieId
          );
          this.updateLocalStorageFavorites();
          this.snackBar.open('Movie removed from favorites!', 'OK', {
            duration: 2000,
          });
          // Update the favorite movies list
          this.favoriteMovies = this.favoriteMovies.filter(
            (movie: any) => movie._id !== movieId
          );
        },
        (error) => {
          console.error('Failed to remove favorite movie:', error);
        }
      );
    } else {
      // Add movie to favorites
      this.userProfileService.addFavoriteMovie(movieId).subscribe(
        () => {
          this.favoriteMovieIds.push(movieId);
          this.updateLocalStorageFavorites();
          this.snackBar.open('Movie saved to favorites!', 'OK', {
            duration: 2000,
          });
          // Update the favorite movies list
          this.getFavoriteMovies(); // Refresh the list
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
    currentUser.FavoriteMovies = this.favoriteMovieIds;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  }
}
