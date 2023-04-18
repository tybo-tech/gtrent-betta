import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss'],
})
export class ConfirmComponent implements OnInit {
  @Input() heading = '';
  @Input() body = '';
  @Input() yesAction = 'Confirm';
  @Input() theClass = 'bi bi-exclamation-diamond-fill _warn';
  @Input() noAction = 'Cancel';
  @Output() doneEvent = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {}
  onEvent(e: boolean) {
    this.doneEvent.emit(e);
  }
}
