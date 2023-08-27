import {TestBed} from '@angular/core/testing';

import {NPThemeService} from './np-theme.service';

describe('NpThemeService', () => {
  let service: NPThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NPThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
