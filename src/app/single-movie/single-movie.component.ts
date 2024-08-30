import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetAllMoviesService } from '../fetch-api-data.service';
import { GenreInfoComponent } from '../genre-info/genre-info.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './single-movie.component.html',
  styleUrls: ['./single-movie.component.scss'],
})
export class SingleMovieComponent implements OnInit {
  movie: any; // Define the movie property to hold movie data

  constructor(
    private route: ActivatedRoute,
    private movieService: GetAllMoviesService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getMovieDetails();
  }

  getMovieDetails(): void {
    const movieId = this.route.snapshot.paramMap.get('id'); // Get the ID from the route parameters
    if (movieId) {
      this.movieService.getSingleMovie(movieId).subscribe((movie) => {
        this.movie = movie;
      });
    }
  }

  navigateToAllMovies(): void {
    this.router.navigate(['/movies']);
  }

  // Function to open the genre dialog
  openGenreDialog(movie: any): void {
    this.dialog.open(GenreInfoComponent, {
      data: movie, // Pass the entire movie object to the dialog
      width: '500px',
    });
  }
}
