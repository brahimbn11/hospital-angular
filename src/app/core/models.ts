export type Role = 'doctor' | 'patient';

export type Specialty =
  | 'Médecine générale'
  | 'Cardiologie'
  | 'Chirurgie'
  | 'Ophtalmologie'
  | 'ORL'
  | 'Dentaire';

export interface BaseUser {
  id: string;
  role: Role;
  fullName: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  createdAt: number;
}

export interface Doctor extends BaseUser {
  role: 'doctor';
  specialty: Specialty | '';
}

export interface Patient extends BaseUser {
  role: 'patient';
  gender: 'male' | 'female' | 'other' | '';
  street: string;
  city: string;
  country: string;
}

export type AppointmentStatus = 'pending' | 'accepted' | 'rejected';

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  specialty: Specialty;
  dateTime: string; // "2026-02-09T10:00"
  status: AppointmentStatus;
  createdAt: number;
  note?: string;
}
