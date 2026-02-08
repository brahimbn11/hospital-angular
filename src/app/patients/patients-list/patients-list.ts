import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Patients, Patient } from '../patients';

@Component({
  selector: 'app-patients-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './patients-list.html',
  styleUrl: './patients-list.scss',
})
export class PatientsList {
  query = '';
  patients: Patient[] = [];

  constructor(private patientsService: Patients) {
    this.refresh();
  }

  refresh() {
    this.patients = this.patientsService.search(this.query);
  }

  remove(id: string) {
    const ok = confirm('Delete this patient?');
    if (!ok) return;

    this.patientsService.delete(id);
    this.refresh();
  }
}
