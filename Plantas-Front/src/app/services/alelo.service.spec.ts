import { TestBed } from '@angular/core/testing';

import { AleloService } from './alelo.service';

describe('AleloService', () => {
  let service: AleloService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AleloService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
