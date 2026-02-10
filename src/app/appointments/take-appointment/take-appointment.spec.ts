import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TakeAppointment } from './take-appointment';

describe('TakeAppointment', () => {
  let component: TakeAppointment;
  let fixture: ComponentFixture<TakeAppointment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TakeAppointment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TakeAppointment);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
