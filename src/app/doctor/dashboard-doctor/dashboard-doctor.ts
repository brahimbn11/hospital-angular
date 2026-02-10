import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Auth } from '../../auth/auth';
import { AppointmentService, Appointment } from '../../appointments/appointments';

@Component({
  selector: 'app-dashboard-doctor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-doctor.html',
  styleUrl: './dashboard-doctor.scss',
})
export class DashboardDoctor {
  appointments: Appointment[] = [];

  constructor(private auth: Auth, private appointmentService: AppointmentService) {
    this.refresh();
  }

  accept(id: string) {
    this.appointmentService.updateStatus(id, 'accepted');
    this.refresh();
  }

  reject(id: string) {
    this.appointmentService.updateStatus(id, 'rejected');
    this.refresh();
  }

  private refresh() {
    const user = this.auth.getCurrentUser();
    if (user) {
      this.appointments = this.appointmentService.getByDoctor(user.username);
    }
  }
}
