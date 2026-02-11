import { Injectable } from '@angular/core';

export type AppointmentStatus = 'pending' | 'accepted' | 'rejected' | 'cancelled';

export interface Appointment {
  id: string;
  doctorUsername: string;
  patientUsername: string;
  specialty: string;
  date: string;        // YYYY-MM-DD
  time: string;        // HH:mm
  status: AppointmentStatus;
  doctorNote?: string; // ✅ motif si refus (ou note)
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

  add(app: Omit<Appointment, 'id' | 'createdAt' | 'status' | 'doctorNote'>) {
    const list = this.load();

    list.push({
      id: crypto.randomUUID(),
      createdAt: Date.now(),
      status: 'pending',
      doctorNote: '',
      ...app,
    });

    this.save(list);
  }

  /** ✅ médecin accepte/refuse (+ motif optionnel) */
  updateStatus(id: string, status: AppointmentStatus, doctorNote?: string) {
    const list = this.load();
    const idx = list.findIndex(a => a.id === id);
    if (idx < 0) return;

    list[idx].status = status;

    // On garde le motif uniquement si refus (ou si tu veux noter quelque chose)
    if (typeof doctorNote === 'string') {
      list[idx].doctorNote = doctorNote.trim();
    }

    this.save(list);
  }

  /** ✅ patient annule seulement si pending */
  cancelByPatient(id: string, patientUsername: string): boolean {
    const list = this.load();
    const idx = list.findIndex(a => a.id === id);
    if (idx < 0) return false;

    const a = list[idx];

    if (a.patientUsername !== patientUsername) return false;
    if (a.status !== 'pending') return false;

    list[idx].status = 'cancelled';
    this.save(list);
    return true;
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

  /** Créneaux pris = pending ou accepted (rejected/cancelled ne bloquent pas) */
  getTakenTimes(doctorUsername: string, date: string): string[] {
    return this.load()
      .filter(a => a.doctorUsername === doctorUsername && a.date === date)
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
