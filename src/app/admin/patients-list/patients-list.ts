import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Auth, ClientUser } from '../../auth/auth';
import { AppointmentService, Appointment } from '../../appointments/appointments';

@Component({
  selector: 'app-admin-patients-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './patients-list.html',
  styleUrl: './patients-list.scss',
})
export class PatientsList {
  patients: ClientUser[] = [];
  selectedPatient: ClientUser | null = null;
  patientAppointments: Appointment[] = [];

  constructor(private auth: Auth, private appt: AppointmentService) {
    this.refresh();
  }

  refresh() {
    this.patients = this.auth.getPatients();
    if (this.selectedPatient) {
      const again = this.auth.getUserByUsername(this.selectedPatient.username);
      this.selectedPatient = again || null;
      this.loadAppointments();
    }
  }

  selectPatient(p: ClientUser) {
    this.selectedPatient = p;
    this.loadAppointments();
  }

  loadAppointments() {
    if (!this.selectedPatient) {
      this.patientAppointments = [];
      return;
    }
    this.patientAppointments = this.appt
      .getByPatient(this.selectedPatient.username)
      .slice()
      .sort((a, b) => (b.date + b.time).localeCompare(a.date + a.time));
  }

  toggleBlocked(p: ClientUser) {
    const next = !p.blocked;
    this.auth.setBlocked(p.username, next);
    this.refresh();
  }
}
