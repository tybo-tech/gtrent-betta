import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FsrDetailsComponent } from './fsr-details.component';

describe('FsrDetailsComponent', () => {
  let component: FsrDetailsComponent;
  let fixture: ComponentFixture<FsrDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FsrDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FsrDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
