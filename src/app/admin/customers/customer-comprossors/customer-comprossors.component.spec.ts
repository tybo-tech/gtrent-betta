import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerComprossorsComponent } from './customer-comprossors.component';

describe('CustomerComprossorsComponent', () => {
  let component: CustomerComprossorsComponent;
  let fixture: ComponentFixture<CustomerComprossorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerComprossorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerComprossorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
