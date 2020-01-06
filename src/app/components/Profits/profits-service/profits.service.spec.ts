import { TestBed } from '@angular/core/testing';

import { ProfitsService } from './profits.service';

describe('ProfitsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProfitsService = TestBed.get(ProfitsService);
    expect(service).toBeTruthy();
  });
});
