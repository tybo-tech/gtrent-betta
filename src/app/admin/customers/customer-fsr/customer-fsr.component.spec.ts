import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerFsrComponent } from './customer-fsr.component';

describe('CustomerFsrComponent', () => {
  let component: CustomerFsrComponent;
  let fixture: ComponentFixture<CustomerFsrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerFsrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerFsrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
