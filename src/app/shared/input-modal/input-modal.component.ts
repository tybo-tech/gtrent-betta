import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input-modal',
  templateUrl: './input-modal.component.html',
  styleUrls: ['./input-modal.component.scss']
})
export class InputModalComponent implements OnInit {
@Input() label = '';
@Input() val? = '';
@Input() inputType = '';
@Output() onValueChanged = new EventEmitter<string>();
@Output() onBack = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }
  save(){
    this.onValueChanged.emit(this.val);
 
  }
  back(){
    this.onBack.emit('')
  }
}
