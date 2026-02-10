import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Services } from './pages/services/services';
import { Contact } from './pages/contact/contact';


import { Login } from './auth/login/login';

import { Dashboard } from './client/dashboard/dashboard';
import { Profile } from './client/profile/profile';

import { authGuard } from './auth/auth-guard';

import { SignupChoice } from './auth/signup-choice/signup-choice';
import { SignupDoctor } from './auth/signup-doctor/signup-doctor';
import { SignupPatient } from './auth/signup-patient/signup-patient';

import { DoctorSpecialty } from './doctor/doctor-specialty/doctor-specialty';
import { PatientWelcome } from './patient/patient-welcome/patient-welcome';

import { DashboardDoctor } from './doctor/dashboard-doctor/dashboard-doctor';
import { DashboardPatient } from './patient/dashboard-patient/dashboard-patient';
import { TakeAppointment } from './appointments/take-appointment/take-appointment';


export const routes: Routes = [
  { path: '', component: Home },
  { path: 'about', component: About },
  { path: 'services', component: Services },
  { path: 'contact', component: Contact },

  { path: 'signup', component: SignupChoice },


{ path: 'signup/doctor', component: SignupDoctor },
{ path: 'signup/patient', component: SignupPatient },

  { path: 'doctor/specialty', component: DoctorSpecialty, canActivate: [authGuard] },
  { path: 'patient/welcome', component: PatientWelcome, canActivate: [authGuard] },



  { path: 'login', component: Login },

  { path: 'dashboard', component: Dashboard, canActivate: [authGuard] },
  { path: 'profile', component: Profile, canActivate: [authGuard] },

  { path: 'dashboard/doctor', component: DashboardDoctor, canActivate: [authGuard] },
  { path: 'dashboard/patient', component: DashboardPatient, canActivate: [authGuard] },
  { path: 'appointments/new', component: TakeAppointment, canActivate: [authGuard] },


  { path: '**', redirectTo: '' }, // ✅ ALWAYS LAST
];

