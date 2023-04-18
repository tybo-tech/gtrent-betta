import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompressorAddPartsComponent } from './compressor-add-parts.component';

describe('CompressorAddPartsComponent', () => {
  let component: CompressorAddPartsComponent;
  let fixture: ComponentFixture<CompressorAddPartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompressorAddPartsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompressorAddPartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
