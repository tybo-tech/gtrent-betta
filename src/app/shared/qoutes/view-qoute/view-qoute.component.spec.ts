import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewQouteComponent } from './view-qoute.component';

describe('ViewQouteComponent', () => {
  let component: ViewQouteComponent;
  let fixture: ComponentFixture<ViewQouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewQouteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewQouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
