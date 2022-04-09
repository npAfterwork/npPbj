import {Pbj} from '../../../model/model';
import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector:    'pbj-type-chooser',
  templateUrl: './type-chooser.component.html',
  styleUrls:   ['./type-chooser.component.scss']
})
export class TypeChooserComponent {

  @Input() value: Pbj.ItemType;
  @Input() types: Pbj.ItemType[];
  @Output() typeChange: EventEmitter<Pbj.ItemType> = new EventEmitter();

}
