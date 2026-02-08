import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth, ClientUser } from '../auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
})
export class Signup {
  user: ClientUser = {
    fullName: '',
    email: '',
    phone: '',
    username: '',
    password: '',
  };

  message = '';

  constructor(private auth: Auth, private router: Router) {}

  submit() {
    const res = this.auth.signup(this.user);
    this.message = res.message;

    if (res.ok) {
      this.router.navigate(['/login']);
    }
  }
}
