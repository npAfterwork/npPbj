import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {NpResponsiveGridComponent} from './np-responsive-grid.component';

describe('NpResponsiveGridComponent', () => {
  let component: NpResponsiveGridComponent;
  let fixture: ComponentFixture<NpResponsiveGridComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [NpResponsiveGridComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NpResponsiveGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
