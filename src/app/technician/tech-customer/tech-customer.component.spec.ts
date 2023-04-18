import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechCustomerComponent } from './tech-customer.component';

describe('TechCustomerComponent', () => {
  let component: TechCustomerComponent;
  let fixture: ComponentFixture<TechCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechCustomerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
