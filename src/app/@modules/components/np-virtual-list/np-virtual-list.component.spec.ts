import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {NPVirtualListComponent} from 'src/app/@modules/components/np-virtual-list/np-virtual-list.component';

describe('NPVirtualListComponent', () => {
    let component: NPVirtualListComponent<any>;
    let fixture: ComponentFixture<NPVirtualListComponent<any>>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [NPVirtualListComponent],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(NPVirtualListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
