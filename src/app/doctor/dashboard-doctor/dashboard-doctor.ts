import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Auth } from '../../auth/auth';
import { AppointmentService, Appointment } from '../../appointments/appointments';

type DayGroup = {
  date: string;
  items: Appointment[];
};

@Component({
  selector: 'app-dashboard-doctor',
  standalone: true,
  imports: [CommonModule, FormsModule], // ✅ IMPORTANT pour ngModel
  templateUrl: './dashboard-doctor.html',
  styleUrl: './dashboard-doctor.scss',
})
export class DashboardDoctor {
  days: DayGroup[] = [];

  rejectingId: string | null = null;
  rejectReason = '';
  message = '';

  constructor(private auth: Auth, private service: AppointmentService) {
    this.refresh();
  }

  private refresh() {
    const user = this.auth.getCurrentUser();
    if (!user) return;

    const list = this.service
      .getByDoctor(user.username)
      .slice()
      .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));

    const map = new Map<string, Appointment[]>();
    for (const a of list) {
      if (!map.has(a.date)) map.set(a.date, []);
      map.get(a.date)!.push(a);
    }

    this.days = Array.from(map.entries()).map(([date, items]) => ({
      date,
      items: items.sort((x, y) => x.time.localeCompare(y.time)),
    }));
  }

  accept(id: string) {
    this.message = '';
    this.service.updateStatus(id, 'accepted');
    this.rejectingId = null;
    this.rejectReason = '';
    this.refresh();
  }

  startReject(id: string) {
    this.message = '';
    this.rejectingId = id;
    this.rejectReason = '';
  }

  cancelReject() {
    this.rejectingId = null;
    this.rejectReason = '';
  }

  confirmReject(id: string) {
    this.message = '';

    const reason = this.rejectReason.trim();
    if (!reason) {
      this.message = 'Veuillez saisir un motif de refus.';
      return;
    }

    this.service.updateStatus(id, 'rejected', reason);
    this.rejectingId = null;
    this.rejectReason = '';
    this.refresh();
  }
}
