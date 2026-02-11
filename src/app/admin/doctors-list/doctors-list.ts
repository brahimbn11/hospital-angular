import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Auth, ClientUser } from '../../auth/auth';
import { AppointmentService, Appointment } from '../../appointments/appointments';

@Component({
  selector: 'app-doctors-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './doctors-list.html',
  styleUrl: './doctors-list.scss',
})
export class DoctorsList {
  doctors: ClientUser[] = [];
  selectedDoctor: ClientUser | null = null;
  doctorAppointments: Appointment[] = [];

  constructor(private auth: Auth, private appt: AppointmentService) {
    this.refresh();
  }

  refresh() {
    this.doctors = this.auth.getDoctors();
    if (this.selectedDoctor) {
      const again = this.auth.getUserByUsername(this.selectedDoctor.username);
      this.selectedDoctor = again || null;
      this.loadAppointments();
    }
  }

  selectDoctor(d: ClientUser) {
    this.selectedDoctor = d;
    this.loadAppointments();
  }

  loadAppointments() {
    if (!this.selectedDoctor) {
      this.doctorAppointments = [];
      return;
    }
    this.doctorAppointments = this.appt
      .getByDoctor(this.selectedDoctor.username)
      .slice()
      .sort((a, b) => (b.date + b.time).localeCompare(a.date + a.time));
  }

  toggleBlocked(d: ClientUser) {
    const next = !d.blocked;
    this.auth.setBlocked(d.username, next);
    this.refresh();
  }
}
