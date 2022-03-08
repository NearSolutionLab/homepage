import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NearViewComponent } from './near-view.component';

describe('NearViewComponent', () => {
  let component: NearViewComponent;
  let fixture: ComponentFixture<NearViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NearViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NearViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
