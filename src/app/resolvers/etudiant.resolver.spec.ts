import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { etudiantResolver } from './etudiant.resolver';

describe('etudiantResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => etudiantResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
