import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColItemComponent } from './col-item.component';

describe('ColItemComponent', () => {
  let component: ColItemComponent;
  let fixture: ComponentFixture<ColItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
