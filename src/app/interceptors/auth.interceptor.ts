import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthentificationService } from '../services/authentification/authentification.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // vérifier si l'url contient "authentification" pour que l'interceptor ne marche pas, si non, ajouter Authrorization
  if (req.url.includes('authentification')) {
    return next(req);
  } else {
    const token = inject(AuthentificationService).getToken();
    console.log(req.url);
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });
    return next(authReq);
  }
};
