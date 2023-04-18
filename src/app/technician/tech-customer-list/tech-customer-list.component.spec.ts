import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechCustomerListComponent } from './tech-customer-list.component';

describe('TechCustomerListComponent', () => {
  let component: TechCustomerListComponent;
  let fixture: ComponentFixture<TechCustomerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechCustomerListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechCustomerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
