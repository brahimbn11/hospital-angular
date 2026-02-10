import { Injectable } from '@angular/core';

export type AppointmentStatus = 'pending' | 'accepted' | 'rejected';

export interface Appointment {
  id: string;
  doctorUsername: string;
  patientUsername: string;
  specialty: string;
  date: string;        // YYYY-MM-DD
  time: string;        // HH:mm
  status: AppointmentStatus;
  createdAt: number;
}

@Injectable({ providedIn: 'root' })
export class AppointmentService {
  private key = 'appointments';

  private load(): Appointment[] {
    return JSON.parse(localStorage.getItem(this.key) || '[]');
  }

  private save(data: Appointment[]) {
    localStorage.setItem(this.key, JSON.stringify(data));
  }

  getAll(): Appointment[] {
    return this.load();
  }

  getByDoctor(username: string): Appointment[] {
    return this.load().filter(a => a.doctorUsername === username);
  }

  getByPatient(username: string): Appointment[] {
    return this.load().filter(a => a.patientUsername === username);
  }

  add(app: Omit<Appointment, 'id' | 'createdAt' | 'status'>) {
    const list = this.load();

    list.push({
      id: crypto.randomUUID(),
      createdAt: Date.now(),
      status: 'pending',
      ...app,
    });

    this.save(list);
  }

  updateStatus(id: string, status: AppointmentStatus) {
    const list = this.load();
    const idx = list.findIndex(a => a.id === id);
    if (idx >= 0) {
      list[idx].status = status;
      this.save(list);
    }
  }
    // --- Disponibilité (créneaux) ---
  private defaultSlots(): string[] {
    // créneaux toutes les 30 minutes : 09:00 → 16:30
    const slots: string[] = [];
    for (let h = 9; h <= 16; h++) {
      for (const m of [0, 30]) {
        const hh = String(h).padStart(2, '0');
        const mm = String(m).padStart(2, '0');
        slots.push(`${hh}:${mm}`);
      }
    }
    return slots;
  }

  getTakenTimes(doctorUsername: string, date: string): string[] {
    return this.load()
      .filter(a => a.doctorUsername === doctorUsername && a.date === date)
      // on bloque aussi si pending (car créneau “réservé” en attente)
      .filter(a => a.status === 'pending' || a.status === 'accepted')
      .map(a => a.time);
  }

  getAvailableTimes(doctorUsername: string, date: string): string[] {
    const taken = new Set(this.getTakenTimes(doctorUsername, date));
    return this.defaultSlots().filter(t => !taken.has(t));
  }

  isSlotAvailable(doctorUsername: string, date: string, time: string): boolean {
    return this.getAvailableTimes(doctorUsername, date).includes(time);
  }

}
