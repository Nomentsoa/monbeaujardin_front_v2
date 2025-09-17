import { TestBed } from '@angular/core/testing';

import { EtudiantService } from './etudiant.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('EtudiantService', () => {
  let service: EtudiantService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClientTesting(), provideHttpClient()],
    });
    service = TestBed.inject(EtudiantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
