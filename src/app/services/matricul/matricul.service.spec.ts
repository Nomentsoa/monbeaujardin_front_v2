import { TestBed } from '@angular/core/testing';

import { MatriculService } from './matricul.service';

describe('MatriculService', () => {
  let service: MatriculService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatriculService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
