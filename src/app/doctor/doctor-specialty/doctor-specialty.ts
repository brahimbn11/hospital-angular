import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth, Specialty } from '../../auth/auth';

@Component({
  selector: 'app-doctor-specialty',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './doctor-specialty.html',
  styleUrl: './doctor-specialty.scss',
})
export class DoctorSpecialty {
  specialties: Specialty[] = [
    'Médecine générale',
    'Cardiologie',
    'Chirurgie',
    'Ophtalmologie',
    'ORL',
    'Dentaire',
    '',
  ].filter(s => s !== '') as Specialty[];

  selected: Specialty = '';

  message = '';

  constructor(private auth: Auth, private router: Router) {
    const u = this.auth.getCurrentUser();
    if (u?.specialty) {
      // déjà choisi
      this.router.navigate(['/doctor/appointments']);
    }
  }

  save() {
    if (!this.selected) {
      this.message = 'Veuillez choisir une spécialité.';
      return;
    }
    this.auth.updateCurrentUser({ specialty: this.selected });
    this.router.navigate(['/doctor/appointments']);
  }
}
