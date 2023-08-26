import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {NPResponsivRowComponent} from './np-responsiv-row.component';

describe('NpResponsivRowComponent', () => {
  let component: NPResponsivRowComponent<any>;
  let fixture: ComponentFixture<NPResponsivRowComponent<any>>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [NPResponsivRowComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NPResponsivRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});