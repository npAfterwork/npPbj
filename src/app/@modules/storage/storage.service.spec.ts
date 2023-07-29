import {TestBed} from '@angular/core/testing';

import {StorageService} from 'src/app/@modules/storage/storage.service';

describe('NPStorageService', () => {
    let service: StorageService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(StorageService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
