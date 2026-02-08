import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth, ClientUser } from '../auth';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
})
export class Signup {
  user: ClientUser = {
  fullName: '',
  email: '',
  phone: '',
  gender: '',
  street: '',
  city: '',
  country: '',
  username: '',
  password: '',
};




  message = '';

  constructor(private auth: Auth, private router: Router) {}

  submit() {
    const res = this.auth.signup(this.user);
    this.message = res.message;

    if (res.ok) this.router.navigate(['/login']);
  }
}
