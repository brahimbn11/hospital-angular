import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupPatient } from './signup-patient';

describe('SignupPatient', () => {
  let component: SignupPatient;
  let fixture: ComponentFixture<SignupPatient>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupPatient]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupPatient);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
