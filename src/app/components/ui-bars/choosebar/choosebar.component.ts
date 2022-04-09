import {Pbj} from '../../../model/model';
import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';

@Component({
  selector:    'pbj-choosebar',
  templateUrl: './choosebar.component.html',
  styleUrls:   ['./choosebar.component.scss']
})
export class ChoosebarComponent implements OnChanges {

  @Input() value: string;
  @Input() choices: { label: string; value: string }[];
  @Output() valueChange: EventEmitter<Pbj.ItemType | 'all'> = new EventEmitter();
  bugfix = true;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.value || changes.choices) {
      console.log('setting value of segment.... not working https://github.com/ionic-team/ionic/issues/17966', this.value);
      this.bugfix = false;
      window.setTimeout(() => { this.bugfix = true; }, 1);
    }
  }

}
