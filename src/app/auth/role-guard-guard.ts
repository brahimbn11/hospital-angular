import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Auth } from './auth';

export const roleGuard = (role: 'doctor' | 'patient'): CanActivateFn => {
  return () => {
    const auth = inject(Auth);
    const router = inject(Router);

    if (!auth.isLoggedIn()) {
      router.navigate(['/']);
      return false;
    }

    if (auth.getRole() !== role) {
      router.navigate(['/dashboard']);
      return false;
    }

    return true;
  };
};
