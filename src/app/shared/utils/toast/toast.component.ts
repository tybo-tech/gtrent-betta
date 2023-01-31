import { Component, Input, OnInit } from '@angular/core';
import { ToastModel } from 'src/models/ux.model';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent implements OnInit {
  @Input() toast: ToastModel = { Message: '', Title: '', Classes: [] };
  constructor() {}

  ngOnInit(): void {
    if(this.toast.Message){
      setTimeout(() => {
        this.toast.Message = ''
      }, 6000);
    }
  }
}
