import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaxMitMeterComponent } from './max-mit-meter.component';

describe('MaxMitMeterComponent', () => {
  let component: MaxMitMeterComponent;
  let fixture: ComponentFixture<MaxMitMeterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaxMitMeterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaxMitMeterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
