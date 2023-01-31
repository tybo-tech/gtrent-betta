import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskTimelinesComponent } from './task-timelines.component';

describe('TaskTimelinesComponent', () => {
  let component: TaskTimelinesComponent;
  let fixture: ComponentFixture<TaskTimelinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskTimelinesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskTimelinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
