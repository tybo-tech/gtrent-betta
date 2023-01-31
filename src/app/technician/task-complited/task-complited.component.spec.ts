import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskComplitedComponent } from './task-complited.component';

describe('TaskComplitedComponent', () => {
  let component: TaskComplitedComponent;
  let fixture: ComponentFixture<TaskComplitedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskComplitedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskComplitedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
