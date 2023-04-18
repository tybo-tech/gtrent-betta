import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechCustomerFormComponent } from './tech-customer-form.component';

describe('TechCustomerFormComponent', () => {
  let component: TechCustomerFormComponent;
  let fixture: ComponentFixture<TechCustomerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechCustomerFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechCustomerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
