import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupDoctor } from './signup-doctor';

describe('SignupDoctor', () => {
  let component: SignupDoctor;
  let fixture: ComponentFixture<SignupDoctor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupDoctor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupDoctor);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
