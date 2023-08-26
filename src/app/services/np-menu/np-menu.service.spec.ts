import {TestBed} from '@angular/core/testing';

import {NPMenuService} from './np-menu.service';

describe('NpMenuService', () => {
    let service: NPMenuService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(NPMenuService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
