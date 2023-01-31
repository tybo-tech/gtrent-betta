import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicainTaskBoardComponent } from './technicain-task-board.component';

describe('TechnicainTaskBoardComponent', () => {
  let component: TechnicainTaskBoardComponent;
  let fixture: ComponentFixture<TechnicainTaskBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechnicainTaskBoardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechnicainTaskBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
