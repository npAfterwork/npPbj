import {TestBed} from '@angular/core/testing';

import {NPResponsiveService} from './np-responsive.service';

describe('NpResponsiveService', () => {
  let service: NPResponsiveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NPResponsiveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
