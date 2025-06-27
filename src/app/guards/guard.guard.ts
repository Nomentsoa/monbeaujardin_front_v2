import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthentificationService } from '../services/authentification/authentification.service';
import { CookieService } from 'ngx-cookie-service';

export const guardGuard: CanActivateFn = (route, state) => {
  const token = inject(CookieService).get('accessToken');
  const router = inject(Router);

  if (token) {
    return true;
  } else {
    router.navigate(['authentification']);
    return false;
  }
};
