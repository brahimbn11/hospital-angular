import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientWelcome } from './patient-welcome';

describe('PatientWelcome', () => {
  let component: PatientWelcome;
  let fixture: ComponentFixture<PatientWelcome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientWelcome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientWelcome);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
