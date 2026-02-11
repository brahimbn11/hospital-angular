import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Auth } from '../../auth/auth';
import { AppointmentService } from '../../appointments/appointments';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.scss',
})
export class AdminDashboard {
  doctorsCount = 0;
  patientsCount = 0;
  appointmentsCount = 0;

  constructor(private auth: Auth, private appt: AppointmentService) {
    this.doctorsCount = this.auth.getDoctors().length;
    this.patientsCount = this.auth.getPatients().length;
    this.appointmentsCount = this.appt.getAll().length;
  }
}
