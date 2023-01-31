import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskQuickViewComponent } from './task-quick-view.component';

describe('TaskQuickViewComponent', () => {
  let component: TaskQuickViewComponent;
  let fixture: ComponentFixture<TaskQuickViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskQuickViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskQuickViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
