import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Auth } from './auth';

export const adminGuard: CanActivateFn = () => {
  const auth = inject(Auth);
  const router = inject(Router);

  if (!auth.isLoggedIn()) {
    router.navigate(['/']);
    return false;
  }

  if (auth.getRole() === 'admin') return true;

  router.navigate(['/']);
  return false;
};
