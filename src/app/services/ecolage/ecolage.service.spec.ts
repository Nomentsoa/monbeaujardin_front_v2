import { TestBed } from '@angular/core/testing';

import { EcolageService } from './ecolage.service';

describe('EcolageService', () => {
  let service: EcolageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EcolageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
