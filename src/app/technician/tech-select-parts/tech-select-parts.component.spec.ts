import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechSelectPartsComponent } from './tech-select-parts.component';

describe('TechSelectPartsComponent', () => {
  let component: TechSelectPartsComponent;
  let fixture: ComponentFixture<TechSelectPartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechSelectPartsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechSelectPartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
