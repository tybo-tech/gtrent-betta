import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompressorPartsComponent } from './compressor-parts.component';

describe('CompressorPartsComponent', () => {
  let component: CompressorPartsComponent;
  let fixture: ComponentFixture<CompressorPartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompressorPartsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompressorPartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
