import { Component } from '@angular/core';
import { GetAllMoviesService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { SynopsisComponent } from '../synopsis/synopsis.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent {
  movies: any[] = [];

  constructor(
    public fetchMovies: GetAllMoviesService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getMovies();
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
}
