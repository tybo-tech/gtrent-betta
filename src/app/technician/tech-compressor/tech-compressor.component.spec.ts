import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechCompressorComponent } from './tech-compressor.component';

describe('TechCompressorComponent', () => {
  let component: TechCompressorComponent;
  let fixture: ComponentFixture<TechCompressorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechCompressorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechCompressorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
