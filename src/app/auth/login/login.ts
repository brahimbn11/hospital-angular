import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../auth';   // auth.ts
import { CommonModule } from '@angular/common';

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
    const res = this.auth.login(this.username, this.password);
    this.message = res.message;

    if (res.ok) {
      this.router.navigate(['/dashboard']);
    }
  }
}

