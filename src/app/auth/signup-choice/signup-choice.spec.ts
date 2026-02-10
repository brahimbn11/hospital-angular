import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupChoice } from './signup-choice';

describe('SignupChoice', () => {
  let component: SignupChoice;
  let fixture: ComponentFixture<SignupChoice>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupChoice]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupChoice);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
