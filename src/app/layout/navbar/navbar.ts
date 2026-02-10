import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Auth } from '../../auth/auth'; // adapte le chemin si besoin

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  isHome = false;

  constructor(public auth: Auth, private router: Router) {
    this.isHome = this.router.url === '/' || this.router.url === '';

    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => {
        this.isHome = this.router.url === '/' || this.router.url === '';
      });
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
  goHome() {
  if (this.auth.isLoggedIn()) {
    // déjà connecté → dashboard
    this.router.navigate(['/dashboard']);
  } else {
    // pas connecté → home
    this.router.navigate(['/']);
  }
}
role: 'doctor' | 'patient' | null = null;

ngOnInit() {
  this.role = this.auth.getRole();
}


}
