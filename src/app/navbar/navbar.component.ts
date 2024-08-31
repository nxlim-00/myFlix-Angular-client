import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  currentRoute: string = '';

  constructor(private router: Router) {
    // Listen to the router events to get the current route
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentRoute = event.url;
      });
  }

  ngOnInit(): void {}

  isAuthenticated(): boolean {
    // Check if the user is logged in, e.g., check local storage for a token
    return !!localStorage.getItem('token');
  }

  navigateToFavorites(): void {
    this.router.navigate(['/favorites']);
  }

  logout(): void {
    // Remove user data from local storage and navigate to welcome page
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('currentUser');
    this.router.navigate(['/welcome']);
  }
}
