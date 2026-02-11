import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Auth } from '../../auth/auth';
import { AppointmentService, Appointment } from '../../appointments/appointments';

@Component({
  selector: 'app-dashboard-patient',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard-patient.html',
  styleUrl: './dashboard-patient.scss',
})
export class DashboardPatient {
  appointments: Appointment[] = [];

  // confirmation dans la page
  pendingCancelId: string | null = null;

  message = '';

  constructor(private auth: Auth, private service: AppointmentService) {
    this.refresh();
  }

  refresh() {
    const user = this.auth.getCurrentUser();
    if (!user) return;

    this.appointments = this.service
      .getByPatient(user.username)
      .slice()
      .sort((a, b) => (b.date + b.time).localeCompare(a.date + a.time));
  }

  askCancel(id: string) {
    this.pendingCancelId = id;
    this.message = '';
  }

  cancelNo() {
    this.pendingCancelId = null;
  }

  cancelYes() {
    const user = this.auth.getCurrentUser();
    if (!user || !this.pendingCancelId) return;

    const ok = this.service.cancelByPatient(this.pendingCancelId, user.username);

    this.message = ok
      ? 'Rendez-vous annulé.'
      : 'Annulation impossible (seulement si le rendez-vous est en attente).';

    this.pendingCancelId = null;
    this.refresh();
  }
}
