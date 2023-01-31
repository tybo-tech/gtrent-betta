import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTaskItemComponent } from './my-task-item.component';

describe('MyTaskItemComponent', () => {
  let component: MyTaskItemComponent;
  let fixture: ComponentFixture<MyTaskItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyTaskItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyTaskItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
