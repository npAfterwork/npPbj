import {TestBed} from '@angular/core/testing';

import {TipOfTheDayService} from 'src/app/services/tip-of-the-day/tip-of-the-day.service';

describe('TipOfTheDayService', () => {
  let service: TipOfTheDayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipOfTheDayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
