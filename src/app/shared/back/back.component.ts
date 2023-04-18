import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-back',
  templateUrl: './back.component.html',
  styleUrls: ['./back.component.scss'],
})
export class BackComponent implements OnInit {
  @Input() heading = '';
  @Input() pageName = '';
  @Input() url = '';
  @Input() handleBackEvent = false;
  @Output() backEvent = new EventEmitter<any>();

  constructor(private router: Router) {}

  ngOnInit(): void {}
  onClick() {
    if (this.handleBackEvent) {
      this.backEvent.emit(true);
      return;
    }
    this.router.navigate([this.url]);
  }
}
