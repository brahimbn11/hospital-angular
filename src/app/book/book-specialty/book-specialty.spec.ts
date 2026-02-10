import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookSpecialty } from './book-specialty';

describe('BookSpecialty', () => {
  let component: BookSpecialty;
  let fixture: ComponentFixture<BookSpecialty>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookSpecialty]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookSpecialty);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
