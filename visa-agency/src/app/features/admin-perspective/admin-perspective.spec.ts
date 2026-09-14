import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPerspective } from './admin-perspective';

describe('AdminPerspective', () => {
  let component: AdminPerspective;
  let fixture: ComponentFixture<AdminPerspective>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminPerspective]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPerspective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
