import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogiticsSystemComponent } from './logitics-system.component';

describe('LogiticsSystemComponent', () => {
  let component: LogiticsSystemComponent;
  let fixture: ComponentFixture<LogiticsSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogiticsSystemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogiticsSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
