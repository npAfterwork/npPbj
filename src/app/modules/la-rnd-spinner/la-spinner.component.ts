import {TlaType} from '../../model/model';
import {SpinnerService} from './spinner.service';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/internal/Subscription';

@Component({
  selector:    'pbj-spinner',
  templateUrl: './la-spinner.component.html',
  styleUrls:   ['./la-spinner.component.scss']
})
export class LaSpinnerComponent implements OnInit, OnDestroy {

  size: 'small' | 'default' | 'medium' | 'large' = 'large';
  bdColor = 'rgba(51,51,51,0.8)';
  color = '#fff';
  type: TlaType = 'ball-scale-multiple';
  private sub: Subscription;

  constructor(
    public spinner: SpinnerService
  ) { }

  ngOnInit() {
    this.sub = this.spinner.type$.subscribe(data => {
      this.size = data.size;
      this.bdColor = data.bdColor;
      this.color = data.color;
      this.type = data.type;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
