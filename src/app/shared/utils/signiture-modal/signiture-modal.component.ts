import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UploadService } from 'src/services/upload.service';

@Component({
  selector: 'app-signiture-modal',
  templateUrl: './signiture-modal.component.html',
  styleUrls: ['./signiture-modal.component.scss']
})
export class SignitureModalComponent implements OnInit {
  @Input() label = '';
  @Input() val? = '';
  @Input() inputType = '';
  sig = ''
  @Output() onValueChanged = new EventEmitter<string>();
  @Output() onBack = new EventEmitter<any>();
  
    constructor(private uploadService: UploadService) { }
  
    ngOnInit(): void {
    }
    save(){
      this.onValueChanged.emit(this.val);
   
    }
    signDone(st: string){
     this.sig = st
    }
    saveImage() {
      const resizedImage = this.dataURLToBlob(this.sig);
      let fileOfBlob = new File([resizedImage], 'sig.png');
      let formData = new FormData();
        formData.append('file',fileOfBlob);
        formData.append('name', 'sig.png');
        this.uploadService.uploadFile(formData).subscribe(response => {
          if (response) {
            const url = `${environment.API_URL}/api/upload/${response}`;
            this.onValueChanged.emit(url);            
          }
        });
    }
    back(){
      this.onBack.emit('')
    }
    dataURLToBlob(dataURL: string) {
      const BASE64_MARKER = ';base64,';
      if (dataURL.indexOf(BASE64_MARKER) === -1) {
        const parts = dataURL.split(',');
        const contentType = parts[0].split(':')[1];
        const raw = parts[1];
        return new Blob([raw], { type: contentType });
      }
  
      const parts = dataURL.split(BASE64_MARKER);
      const contentType = parts[0].split(':')[1];
      const raw = window.atob(parts[1]);
      const rawLength = raw.length;
  
      const uInt8Array = new Uint8Array(rawLength);
  
      for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
      }
  
      return new Blob([uInt8Array], { type: contentType });
    }
}
