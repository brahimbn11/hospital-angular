import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Auth, ClientUser, Specialty } from '../../auth/auth';

@Component({
  selector: 'app-doctor-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './doctor-profile.html',
  styleUrl: './doctor-profile.scss',
})
export class DoctorProfile {
  user: ClientUser | null = null;
  model: Partial<ClientUser> = {};
  message = '';

  specialties: Specialty[] = [
    'Médecine générale',
    'Cardiologie',
    'Chirurgie',
    'Ophtalmologie',
    'ORL',
    'Dentaire',
  ];

  constructor(private auth: Auth) {
    this.user = this.auth.getCurrentUser();
    if (this.user) {
      this.model = {
        fullName: this.user.fullName,
        email: this.user.email,
        phone: this.user.phone,
        gender: this.user.gender,
        street: this.user.street,
        city: this.user.city,
        country: this.user.country,
        specialty: this.user.specialty,
      };
    }
  }

  save() {
    this.message = '';

    if (
      !this.model.fullName ||
      !this.model.email ||
      !this.model.phone ||
      !this.model.specialty
    ) {
      this.message = 'Veuillez remplir Nom, Email, Téléphone et Spécialité.';
      return;
    }

    if (!/^\d+$/.test(String(this.model.phone))) {
      this.message = 'Téléphone invalide (chiffres uniquement).';
      return;
    }

    this.auth.updateCurrentUser(this.model);
    this.user = this.auth.getCurrentUser();
    this.message = 'Profil mis à jour avec succès.';
  }
}
