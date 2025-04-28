import { TestBed } from '@angular/core/testing';

import { AlertTypesService } from './alert-types.service';

describe('AlertTypesService', () => {
  let service: AlertTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
