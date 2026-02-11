import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Services } from './pages/services/services';
import { Contact } from './pages/contact/contact';

import { Login } from './auth/login/login';

import { SignupChoice } from './auth/signup-choice/signup-choice';
import { SignupDoctor } from './auth/signup-doctor/signup-doctor';
import { SignupPatient } from './auth/signup-patient/signup-patient';

import { DashboardDoctor } from './doctor/dashboard-doctor/dashboard-doctor';
import { DashboardPatient } from './patient/dashboard-patient/dashboard-patient';

import { TakeAppointment } from './appointments/take-appointment/take-appointment';

import { DoctorProfile } from './doctor/doctor-profile/doctor-profile';
import { PatientProfile } from './patient/patient-profile/patient-profile';

import { AdminDashboard } from './admin/admin-dashboard/admin-dashboard';
import { DoctorsList } from './admin/doctors-list/doctors-list';
import { PatientsList as AdminPatientsList } from './admin/patients-list/patients-list';
import { AdminProfile } from './admin/admin-profile/admin-profile';

import { authGuard } from './auth/auth-guard';
import { doctorGuard, patientGuard } from './auth/role-guard';
import { adminGuard } from './auth/admin-guard-guard';

export const routes: Routes = [
  // Public
  { path: '', component: Home },
  { path: 'about', component: About },
  { path: 'services', component: Services },
  { path: 'contact', component: Contact },

  { path: 'login', component: Login },

  // Signup flow
  { path: 'signup', component: SignupChoice },
  { path: 'signup/doctor', component: SignupDoctor },
  { path: 'signup/patient', component: SignupPatient },

  // Doctor
  { path: 'dashboard/doctor', component: DashboardDoctor, canActivate: [authGuard, doctorGuard] },
  { path: 'profile/doctor', component: DoctorProfile, canActivate: [authGuard, doctorGuard] },

  // Patient
  { path: 'dashboard/patient', component: DashboardPatient, canActivate: [authGuard, patientGuard] },
  { path: 'appointments/new', component: TakeAppointment, canActivate: [authGuard, patientGuard] },
  { path: 'profile/patient', component: PatientProfile, canActivate: [authGuard, patientGuard] },

  // Admin
  { path: 'admin', component: AdminDashboard, canActivate: [authGuard, adminGuard] },
  { path: 'admin/doctors', component: DoctorsList, canActivate: [authGuard, adminGuard] },
  { path: 'admin/patients', component: AdminPatientsList, canActivate: [authGuard, adminGuard] },
  { path: 'admin/profile', component: AdminProfile, canActivate: [authGuard, adminGuard] },

  // fallback
  { path: '**', redirectTo: '' },
];
