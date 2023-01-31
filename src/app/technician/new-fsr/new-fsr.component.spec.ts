import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFsrComponent } from './new-fsr.component';

describe('NewFsrComponent', () => {
  let component: NewFsrComponent;
  let fixture: ComponentFixture<NewFsrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewFsrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewFsrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
