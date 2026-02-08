import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Services } from './pages/services/services';
import { Contact } from './pages/contact/contact';

import { Signup } from './auth/signup/signup';
import { Login } from './auth/login/login';

import { Dashboard } from './client/dashboard/dashboard';
import { Profile } from './client/profile/profile';

import { authGuard } from './auth/auth-guard';

import { PatientsList } from './patients/patients-list/patients-list';
import { PatientForm } from './patients/patient-form/patient-form';


export const routes: Routes = [
  { path: '', component: Home },
  { path: 'about', component: About },
  { path: 'services', component: Services },
  { path: 'contact', component: Contact },

  { path: 'signup', component: Signup },
  { path: 'login', component: Login },

  { path: 'dashboard', component: Dashboard, canActivate: [authGuard] },
  { path: 'profile', component: Profile, canActivate: [authGuard] },

  { path: 'patients', component: PatientsList, canActivate: [authGuard] },
  { path: 'patients/new', component: PatientForm, canActivate: [authGuard] },
  { path: 'patients/:id/edit', component: PatientForm, canActivate: [authGuard] },

  { path: '**', redirectTo: '' }, // ✅ ALWAYS LAST
];

