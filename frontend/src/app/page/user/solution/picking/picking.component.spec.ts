import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickingComponent } from './picking.component';

describe('PeakingComponent', () => {
  let component: PickingComponent;
  let fixture: ComponentFixture<PickingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PickingComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PickingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
