import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechCompressorPartsComponent } from './tech-compressor-parts.component';

describe('TechCompressorPartsComponent', () => {
  let component: TechCompressorPartsComponent;
  let fixture: ComponentFixture<TechCompressorPartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechCompressorPartsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechCompressorPartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
