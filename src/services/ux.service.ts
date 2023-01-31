import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UxModel } from 'src/models/ux.model';

@Injectable({
  providedIn: 'root',
})
export class UxService {
  private uxBehaviorSubject: BehaviorSubject<UxModel>;
  public uxObservable: Observable<UxModel>;

  constructor() {
    this.uxBehaviorSubject = new BehaviorSubject<UxModel>({});
    this.uxObservable = this.uxBehaviorSubject.asObservable();
  }
  updateUXState(ux: UxModel) {
    if (this.uxBehaviorSubject) this.uxBehaviorSubject.next(ux);
  }
  public get ux() {
    return this.uxBehaviorSubject?.value;
  }
}
