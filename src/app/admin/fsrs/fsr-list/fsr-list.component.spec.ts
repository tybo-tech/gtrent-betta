import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FsrListComponent } from './fsr-list.component';

describe('FsrListComponent', () => {
  let component: FsrListComponent;
  let fixture: ComponentFixture<FsrListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FsrListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FsrListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
