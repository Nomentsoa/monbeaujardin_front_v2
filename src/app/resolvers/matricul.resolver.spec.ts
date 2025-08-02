import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { matriculResolver } from './matricul.resolver';

describe('matriculResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => matriculResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
