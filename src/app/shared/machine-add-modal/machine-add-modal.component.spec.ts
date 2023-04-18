import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineAddModalComponent } from './machine-add-modal.component';

describe('MachineAddModalComponent', () => {
  let component: MachineAddModalComponent;
  let fixture: ComponentFixture<MachineAddModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MachineAddModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MachineAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
