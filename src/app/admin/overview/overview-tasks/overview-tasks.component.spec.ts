import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewTasksComponent } from './overview-tasks.component';

describe('OverviewTasksComponent', () => {
  let component: OverviewTasksComponent;
  let fixture: ComponentFixture<OverviewTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverviewTasksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverviewTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
