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

  // 🔴 patient sélectionné pour suppression
  pendingDeleteId: string | null = null;

  constructor(private patientsService: Patients) {
    this.refresh();
  }

  refresh() {
    this.patients = this.patientsService.search(this.query);
  }

  askDelete(id: string) {
    this.pendingDeleteId = id;
  }

  cancelDelete() {
    this.pendingDeleteId = null;
  }

  confirmDelete() {
    if (!this.pendingDeleteId) return;

    this.patientsService.delete(this.pendingDeleteId);
    this.pendingDeleteId = null;
    this.refresh();
  }
}
