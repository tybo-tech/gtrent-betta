import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicePartsComponent } from './service-parts.component';

describe('ServicePartsComponent', () => {
  let component: ServicePartsComponent;
  let fixture: ComponentFixture<ServicePartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicePartsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicePartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
