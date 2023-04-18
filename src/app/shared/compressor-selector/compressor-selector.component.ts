import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Customer } from 'src/models/customer.model';
import { Machine } from 'src/models/machine.model';

@Component({
  selector: 'app-compressor-selector',
  templateUrl: './compressor-selector.component.html',
  styleUrls: ['./compressor-selector.component.scss'],
})
export class CompressorSelectorComponent implements OnInit {
  @Input() customer?: Customer;
  @Output() doneEvent = new EventEmitter<Machine>();
  searchString = '';
  add = '';
  constructor() {}

  ngOnInit(): void {}
  back() {
    this.doneEvent.emit(undefined);
  }
  select(machine: Machine) {
    this.doneEvent.emit(machine);
  }
  doneAdd(m: Machine) {
    if (m && this.customer) {
      if (!this.customer.Machines) this.customer.Machines = [];
      this.customer.Machines.unshift(m)
    }
  }
}
