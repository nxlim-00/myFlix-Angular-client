import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { FavoriteListComponent } from './favorite-list/favorite-list.component';
import { SingleMovieComponent } from './single-movie/single-movie.component';

const routes: Routes = [
  { path: 'welcome', component: WelcomePageComponent },
  { path: 'movies', component: MovieCardComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'favorites', component: FavoriteListComponent },
  { path: 'movies/:id', component: SingleMovieComponent },
  { path: '', redirectTo: '/welcome', pathMatch: 'full' }, // Redirect to welcome by default
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
