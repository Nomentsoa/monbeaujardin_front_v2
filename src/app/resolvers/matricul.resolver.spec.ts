import { ResolveFn } from '@angular/router';

import { matriculResolver } from './matricul.resolver';
import { TestBed } from '@angular/core/testing';

describe('matriculResolver', () => {
  const executeResolver: ResolveFn<string> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() =>
      matriculResolver(...resolverParameters)
    );

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
