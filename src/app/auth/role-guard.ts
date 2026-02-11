import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Auth } from './auth';

export const doctorGuard: CanActivateFn = () => {
  const auth = inject(Auth);
  const router = inject(Router);

  if (!auth.isLoggedIn()) { router.navigate(['/']); return false; }
  if (auth.getRole() === 'doctor') return true;

  router.navigate(['/']);
  return false;
};

export const patientGuard: CanActivateFn = () => {
  const auth = inject(Auth);
  const router = inject(Router);

  if (!auth.isLoggedIn()) { router.navigate(['/']); return false; }
  if (auth.getRole() === 'patient') return true;

  router.navigate(['/']);
  return false;
};
