import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Patients, Patient } from '../patients';

@Component({
  selector: 'app-patient-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './patient-form.html',
  styleUrl: './patient-form.scss',
})
export class PatientForm {
  id: string | null = null;

  model: Omit<Patient, 'id' | 'createdAt'> = {
    fullName: '',
    cin: '',
    phone: '',
    birthDate: '',
    address: '',
  };

  message = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private patientsService: Patients
  ) {
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      const p = this.patientsService.getById(this.id);
      if (p) {
        this.model = {
          fullName: p.fullName,
          cin: p.cin,
          phone: p.phone,
          birthDate: p.birthDate,
          address: p.address,
        };
      } else {
        this.message = 'Patient not found.';
      }
    }
  }

  save() {
    if (!this.model.fullName || !this.model.cin || !this.model.phone) {
      this.message = 'Please fill Full name, CIN and Phone.';
      return;
    }

    if (this.id) {
      const ok = this.patientsService.update(this.id, this.model);
      this.message = ok ? 'Updated successfully.' : 'Update failed.';
    } else {
      this.patientsService.add(this.model);
      this.message = 'Added successfully.';
    }

    this.router.navigate(['/patients']);
  }
}
