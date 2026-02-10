import { Injectable } from '@angular/core';
import { Doctor, Specialty } from '../core/models';

@Injectable({ providedIn: 'root' })
export class Doctors {
  private usersKey = 'users';

  private users(): any[] {
    return JSON.parse(localStorage.getItem(this.usersKey) || '[]');
  }

  getAllDoctors(): Doctor[] {
    return this.users().filter(u => u.role === 'doctor');
  }

  getDoctorsBySpecialty(spec: Specialty): Doctor[] {
    return this.getAllDoctors().filter(d => d.specialty === spec);
  }

  getById(id: string): Doctor | undefined {
    return this.getAllDoctors().find(d => d.id === id);
  }
}
