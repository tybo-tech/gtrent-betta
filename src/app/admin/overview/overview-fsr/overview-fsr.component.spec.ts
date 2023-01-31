import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewFsrComponent } from './overview-fsr.component';

describe('OverviewFsrComponent', () => {
  let component: OverviewFsrComponent;
  let fixture: ComponentFixture<OverviewFsrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverviewFsrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverviewFsrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
