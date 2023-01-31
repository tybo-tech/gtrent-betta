import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  NgSignaturePadOptions,
  SignaturePadComponent,
} from '@almothafar/angular-signature-pad';

@Component({
  selector: 'app-signiture-pad',
  templateUrl: './signiture-pad.component.html',
  styleUrls: ['./signiture-pad.component.scss'],
})
export class SigniturePadComponent implements OnInit {
  @Output() onValueChanged = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  @ViewChild('signature')
  public signaturePad?: SignaturePadComponent;

  signaturePadOptions: NgSignaturePadOptions = {
    minWidth: 5,
    canvasWidth: 500,
    canvasHeight: 100,
  };

  ngAfterViewInit() {
    if (!this.signaturePad) return;
    this.signaturePad.set('minWidth', 5);
    this.signaturePad.clear();
  }

  drawComplete(event: MouseEvent | Touch) {
    if (!this.signaturePad) return;
    console.log(this.signaturePad.toDataURL());
    this.onValueChanged.emit(this.signaturePad.toDataURL());
  }

  drawStart(event: MouseEvent | Touch) {}
}
