import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FsrCardComponent } from './fsr-card.component';

describe('FsrCardComponent', () => {
  let component: FsrCardComponent;
  let fixture: ComponentFixture<FsrCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FsrCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FsrCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
