import { TestBed } from '@angular/core/testing';

import { MatriculService } from './matricul.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpClient, provideHttpClient } from '@angular/common/http';

describe('MatriculService', () => {
  let service: MatriculService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()],
    });
    service = TestBed.inject(MatriculService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
