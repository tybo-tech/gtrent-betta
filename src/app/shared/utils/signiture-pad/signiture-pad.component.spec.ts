import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigniturePadComponent } from './signiture-pad.component';

describe('SigniturePadComponent', () => {
  let component: SigniturePadComponent;
  let fixture: ComponentFixture<SigniturePadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SigniturePadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SigniturePadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
