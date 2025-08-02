import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { MatriculService } from '../services/matricul/matricul.service';

export const matriculResolver: ResolveFn<string> = (route, state) => {
  const matriculService = inject(MatriculService);
  return matriculService.getDernierMatricul('ETUDIANT');
};
