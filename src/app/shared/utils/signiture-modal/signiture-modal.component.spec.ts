import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignitureModalComponent } from './signiture-modal.component';

describe('SignitureModalComponent', () => {
  let component: SignitureModalComponent;
  let fixture: ComponentFixture<SignitureModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignitureModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignitureModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
