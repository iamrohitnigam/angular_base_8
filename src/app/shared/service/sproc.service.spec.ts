import { TestBed } from '@angular/core/testing';

import { SprocService } from './sproc.service';

describe('SprocService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SprocService = TestBed.get(SprocService);
    expect(service).toBeTruthy();
  });
});
