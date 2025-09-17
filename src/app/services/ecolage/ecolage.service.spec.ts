import { TestBed } from '@angular/core/testing';

import { EcolageService } from './ecolage.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('EcolageService', () => {
  let service: EcolageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClientTesting(), provideHttpClient()],
    });
    service = TestBed.inject(EcolageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
