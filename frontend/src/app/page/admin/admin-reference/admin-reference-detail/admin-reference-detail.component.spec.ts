import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminReferenceDetailComponent } from './admin-reference-detail.component';

describe('AdminReferenceDetailComponent', () => {
  let component: AdminReferenceDetailComponent;
  let fixture: ComponentFixture<AdminReferenceDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminReferenceDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminReferenceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
