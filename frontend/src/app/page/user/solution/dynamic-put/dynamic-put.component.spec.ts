import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicPutComponent } from './dynamic-put.component';

describe('DynamicPutComponent', () => {
  let component: DynamicPutComponent;
  let fixture: ComponentFixture<DynamicPutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicPutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicPutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
