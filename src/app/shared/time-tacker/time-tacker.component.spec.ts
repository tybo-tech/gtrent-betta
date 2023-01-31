import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeTackerComponent } from './time-tacker.component';

describe('TimeTackerComponent', () => {
  let component: TimeTackerComponent;
  let fixture: ComponentFixture<TimeTackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeTackerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeTackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
