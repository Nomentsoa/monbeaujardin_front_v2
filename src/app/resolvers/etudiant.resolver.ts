import { ResolveFn } from '@angular/router';

export const etudiantResolver: ResolveFn<boolean> = (route, state) => {
  return true;
};
