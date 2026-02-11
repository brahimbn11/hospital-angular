import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  username = '';
  password = '';
  message = '';

  constructor(private auth: Auth, private router: Router) {}

  submit() {
    this.message = '';
    const res = this.auth.login(this.username, this.password);
    this.message = res.message;

    if (!res.ok) return;

    const role = this.auth.getRole();
    if (role === 'admin') this.router.navigate(['/admin']);
    else if (role === 'doctor') this.router.navigate(['/dashboard/doctor']);
    else this.router.navigate(['/dashboard/patient']);
  }
}
