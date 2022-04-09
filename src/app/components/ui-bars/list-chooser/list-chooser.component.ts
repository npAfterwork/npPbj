import {Pbj} from '../../../model/model';
import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector:    'pbj-list-chooser',
  templateUrl: './list-chooser.component.html',
  styleUrls:   ['./list-chooser.component.scss']
})
export class ListChooserComponent {
  @Input() value: Pbj.ListType;
  @Output() typeChange: EventEmitter<Pbj.ListType> = new EventEmitter();
  @Input() lists: Pbj.ListType[];

}
