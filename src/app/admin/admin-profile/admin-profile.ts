import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Auth, ClientUser } from '../../auth/auth';

@Component({
  selector: 'app-admin-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-profile.html',
  styleUrl: './admin-profile.scss',
})
export class AdminProfile {
  user: ClientUser | null = null;
  model: Partial<ClientUser> = {};
  message = '';

  constructor(private auth: Auth) {
    this.user = this.auth.getCurrentUser();
    if (this.user) {
      this.model = {
        fullName: this.user.fullName,
        email: this.user.email,
        phone: this.user.phone,
        street: this.user.street,
        city: this.user.city,
        country: this.user.country,
      };
    }
  }

  save() {
    this.message = '';

    if (!this.model.fullName || !this.model.email || !this.model.phone) {
      this.message = 'Veuillez remplir Nom, Email et Téléphone.';
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
