import { TestBed } from '@angular/core/testing';

import { DenominationCalculatorService } from './denomination-calculator.service';

describe('DenominationCalculatorService', () => {
  let service: DenominationCalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DenominationCalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
