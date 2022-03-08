import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PtlSystemComponent } from './ptl-system.component';

describe('PtlSystemComponent', () => {
  let component: PtlSystemComponent;
  let fixture: ComponentFixture<PtlSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PtlSystemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PtlSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
