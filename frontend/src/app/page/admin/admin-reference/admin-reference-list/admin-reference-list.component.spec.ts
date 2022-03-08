import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminReferenceListComponent } from './admin-reference-list.component';

describe('AdminReferenceListComponent', () => {
  let component: AdminReferenceListComponent;
  let fixture: ComponentFixture<AdminReferenceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminReferenceListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminReferenceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
