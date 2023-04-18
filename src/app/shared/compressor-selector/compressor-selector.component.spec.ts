import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompressorSelectorComponent } from './compressor-selector.component';

describe('CompressorSelectorComponent', () => {
  let component: CompressorSelectorComponent;
  let fixture: ComponentFixture<CompressorSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompressorSelectorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompressorSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
