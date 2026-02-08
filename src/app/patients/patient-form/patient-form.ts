import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Patients, Patient } from '../patients';

type PatientInput = Omit<Patient, 'id' | 'createdAt'>;

@Component({
  selector: 'app-patient-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './patient-form.html',
  styleUrl: './patient-form.scss',
})
export class PatientForm {
  id: string | null = null;

  // uniquement les champs éditables
  model: PatientInput = {
    fullName: '',
    cin: '',
    gender: '',
    phone: '',
    birthDate: '',
    address: '',
    city: '',
    country: '',
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
        // on copie seulement les champs éditables (sans id, createdAt)
        this.model = {
          fullName: p.fullName,
          cin: p.cin,
          gender: p.gender,
          phone: p.phone,
          birthDate: p.birthDate,
          address: p.address,
          city: p.city,
          country: p.country,
        };
      } else {
        this.message = 'Patient not found.';
      }
    }
  }

  get isEdit(): boolean {
    return !!this.id;
  }

  save() {
    // validation simple (tout obligatoire)
    const m = this.model;

    if (
      !m.fullName ||
      !m.cin ||
      !m.gender ||
      !m.phone ||
      !m.birthDate ||
      !m.address ||
      !m.city ||
      !m.country
    ) {
      this.message = 'Veuillez remplir tous les champs.';
      return;
    }

    // téléphone : chiffres seulement
    if (!/^\d+$/.test(m.phone)) {
      this.message = 'Téléphone invalide (chiffres uniquement).';
      return;
    }

    if (this.id) {
      const ok = this.patientsService.update(this.id, m);
      this.message = ok ? 'Updated successfully.' : 'Update failed.';
    } else {
      this.patientsService.add(m);
      this.message = 'Added successfully.';
    }

    this.router.navigate(['/patients']);
  }
}
