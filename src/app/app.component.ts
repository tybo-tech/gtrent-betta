import { Component ,OnInit} from '@angular/core';
import { environment } from 'src/environments/environment';
import { UxModel } from 'src/models/ux.model';
import { UxService } from 'src/services/ux.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  ux: UxModel = {};
  constructor(
    private uxService: UxService
  ) {}

  ngOnInit(): void {
    if (environment.production) {
      if (location.protocol === 'http:') {
        window.location.href = location.href.replace('http', 'https');
      }
    }
    this.uxService.uxObservable.subscribe(data=> this.ux = data)

  }
}
