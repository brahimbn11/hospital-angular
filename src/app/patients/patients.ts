import { Injectable } from '@angular/core';

export interface Patient {
  id: string;         // unique id
  fullName: string;
  cin: string;
  phone: string;
  birthDate: string;  // "YYYY-MM-DD"
  address: string;
  createdAt: number;
}

@Injectable({ providedIn: 'root' })
export class Patients {
  private key = 'patients';

  private load(): Patient[] {
    return JSON.parse(localStorage.getItem(this.key) || '[]');
  }

  private save(patients: Patient[]) {
    localStorage.setItem(this.key, JSON.stringify(patients));
  }

  getAll(): Patient[] {
    // newest first
    return this.load().sort((a, b) => b.createdAt - a.createdAt);
  }

  getById(id: string): Patient | undefined {
    return this.load().find(p => p.id === id);
  }

  add(data: Omit<Patient, 'id' | 'createdAt'>): Patient {
    const patients = this.load();

    const newPatient: Patient = {
      id: crypto.randomUUID(),
      createdAt: Date.now(),
      ...data,
    };

    patients.push(newPatient);
    this.save(patients);

    return newPatient;
  }

  update(id: string, updates: Partial<Omit<Patient, 'id' | 'createdAt'>>): boolean {
    const patients = this.load();
    const index = patients.findIndex(p => p.id === id);
    if (index === -1) return false;

    patients[index] = { ...patients[index], ...updates };
    this.save(patients);
    return true;
  }

  delete(id: string): boolean {
    const patients = this.load();
    const next = patients.filter(p => p.id !== id);
    if (next.length === patients.length) return false;

    this.save(next);
    return true;
  }

  search(query: string): Patient[] {
    const q = query.trim().toLowerCase();
    if (!q) return this.getAll();

    return this.getAll().filter(p =>
      p.fullName.toLowerCase().includes(q) ||
      p.cin.toLowerCase().includes(q) ||
      p.phone.toLowerCase().includes(q)
    );
  }
}
