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

  constructor(private auth: Auth, private appointmentService: AppointmentService) {
    const user = this.auth.getCurrentUser();
    if (user) {
      this.appointments = this.appointmentService.getByPatient(user.username);
    }
  }
}
