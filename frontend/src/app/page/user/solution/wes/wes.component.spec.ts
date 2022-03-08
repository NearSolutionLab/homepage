import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WesComponent } from './wes.component';

describe('WesComponent', () => {
  let component: WesComponent;
  let fixture: ComponentFixture<WesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
