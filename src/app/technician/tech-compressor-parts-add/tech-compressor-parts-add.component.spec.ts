import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechCompressorPartsAddComponent } from './tech-compressor-parts-add.component';

describe('TechCompressorPartsAddComponent', () => {
  let component: TechCompressorPartsAddComponent;
  let fixture: ComponentFixture<TechCompressorPartsAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechCompressorPartsAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechCompressorPartsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
