import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookDoctors } from './book-doctors';

describe('BookDoctors', () => {
  let component: BookDoctors;
  let fixture: ComponentFixture<BookDoctors>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookDoctors]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookDoctors);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
