import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Auth } from '../../auth/auth';

@Component({
  selector: 'app-patient-welcome',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './patient-welcome.html',
  styleUrl: './patient-welcome.scss',
})
export class PatientWelcome {
  fullName = '';

  constructor(private auth: Auth) {
    this.fullName = this.auth.getCurrentUser()?.fullName ?? '';
  }
}
