import {ClaTypes, TlaSpinnerData} from '../../model/model';
import {Injectable} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  private data = {
    all:   [],
    last:  undefined,
    store: new BehaviorSubject<TlaSpinnerData>(SpinnerService.createData())
  };

  readonly type$ = this.data.store.asObservable();

  constructor(
    private ngxSpinner: NgxSpinnerService
  ) {
    console.log('23: Spinner constructor');
  }

  static createData(): TlaSpinnerData {
    return {
      type:    'ball-scale-multiple',
      size:    'large',
      color:   '#fff',
      bdColor: 'rgba(8,8,8,0.53)'
    };
  }

  async show() {
    const newSpinner = SpinnerService.createData();
    newSpinner.type = ClaTypes[Math.floor(Math.random() * ClaTypes.length)];
    while (newSpinner.type === this.data.last) {
      newSpinner.type = ClaTypes[Math.floor(Math.random() * ClaTypes.length)];
    }
    this.data.last = newSpinner.type;
    this.data.store.next(newSpinner);
    return this.ngxSpinner.show();
  }

  async hide() {
    return this.ngxSpinner.hide();
  }
}
