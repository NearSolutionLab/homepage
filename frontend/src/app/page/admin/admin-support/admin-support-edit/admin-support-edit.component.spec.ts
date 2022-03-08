import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSupportEditComponent } from './admin-support-edit.component';

describe('AdminSupportEditComponent', () => {
  let component: AdminSupportEditComponent;
  let fixture: ComponentFixture<AdminSupportEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSupportEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSupportEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
