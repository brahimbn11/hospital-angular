import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Auth, ClientUser, Specialty } from '../../auth/auth';
import { AppointmentService } from '../appointments';

@Component({
  selector: 'app-take-appointment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './take-appointment.html',
  styleUrl: './take-appointment.scss',
})
export class TakeAppointment {
  step: 1 | 2 | 3 = 1;


  specialty: Specialty | '' = '';
  doctorUsername = '';
  date = '';
  time = '';

  specialties: Specialty[] = [
    'Médecine générale',
    'Cardiologie',
    'Chirurgie',
    'Ophtalmologie',
    'ORL',
    'Dentaire',
  ];

  availableTimes: string[] = [];
message = '';

onDateChange() {
  this.message = '';
  this.time = '';
  if (!this.date || !this.doctorUsername) {
    this.availableTimes = [];
    return;
  }

  this.availableTimes = this.service.getAvailableTimes(
    this.doctorUsername,
    this.date
  );
}


  filteredDoctors: ClientUser[] = [];

  constructor(
    private auth: Auth,
    private service: AppointmentService,
    private router: Router
  ) {}

  chooseSpecialty() {
    this.filteredDoctors = this.auth.getDoctorsBySpecialty(this.specialty);
    this.step = 2;
  }

  chooseDoctor(username: string) {
  this.doctorUsername = username;
  this.date = '';
  this.time = '';
  this.availableTimes = [];
  this.step = 3;
}


  submit() {
  this.message = '';
  const user = this.auth.getCurrentUser();
  if (!user) return;

  if (!this.date || !this.time) {
    this.message = 'Veuillez choisir une date et une heure.';
    return;
  }

  const ok = this.service.isSlotAvailable(this.doctorUsername, this.date, this.time);
  if (!ok) {
    this.message = 'Ce créneau n’est plus disponible. Choisissez un autre horaire.';
    this.onDateChange(); // refresh times
    return;
  }

  this.service.add({
    patientUsername: user.username,
    doctorUsername: this.doctorUsername,
    specialty: this.specialty,
    date: this.date,
    time: this.time,
  });

  this.router.navigate(['/dashboard/patient']);
}

}
