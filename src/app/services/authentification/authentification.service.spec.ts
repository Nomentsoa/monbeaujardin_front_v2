import { TestBed } from '@angular/core/testing';

import { AuthentificationService } from './authentification.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('AuthentificationService', () => {
  let service: AuthentificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClientTesting(), provideHttpClient()],
    });
    service = TestBed.inject(AuthentificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
