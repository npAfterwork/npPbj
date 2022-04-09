import {Pbj} from '../../../model/model';
import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector:    'pbj-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls:   ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {

  percentage: number;
  current: number;
  total: number;
  msg: string;

  @Input('progress')
  set progress(value: Pbj.Progress) {
    if (value) {
      this.msg = value.textID;
      if (value.type === 'start') {
        this.percentage = 0;
        this.current = 0;
        this.total = value.count;
      } else if (value.type === 'end') {
        this.percentage = 100;
        this.current = this.total;
      } else {
        this.current += value.count;
        this.percentage = Math.trunc(this.current / this.total * 100);
      }
    } else {
      this.percentage = 0;
      this.current = 0;
      this.total = 0;
      this.msg = '';
    }
  }

  ngOnInit() {
    this.percentage = 50;
    this.current = 5;
    this.total = 10;
    this.msg = 'Half way through';
  }

}
