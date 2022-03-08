import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminReferenceEditComponent } from './admin-reference-edit.component';

describe('AdminReferenceEditComponent', () => {
  let component: AdminReferenceEditComponent;
  let fixture: ComponentFixture<AdminReferenceEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminReferenceEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminReferenceEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
