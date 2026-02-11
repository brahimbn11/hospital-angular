import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Auth, UserRole } from '../../auth/auth';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar implements OnInit {
  isHome = false;
  role: UserRole | null = null;

  constructor(public auth: Auth, private router: Router) {}

  ngOnInit() {
    this.role = this.auth.getRole();

    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(() => {
      this.isHome = this.router.url === '/' || this.router.url === '';
      this.role = this.auth.getRole();
    });
  }

  goHome() {
    if (this.auth.isLoggedIn()) {
      const role = this.auth.getRole();
      if (role === 'admin') this.router.navigate(['/admin']);
      else if (role === 'doctor') this.router.navigate(['/dashboard/doctor']);
      else this.router.navigate(['/dashboard/patient']);
      return;
    }

    this.router.navigate(['/']);
  }

  logout() {
    this.auth.logout();
    this.role = null;
    this.router.navigate(['/']);
  }
}
