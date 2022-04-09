import {CPBJ} from '../../model/consts';
import {Pbj} from '../../model/model';
import {PBJBasePopover} from '../popover-base';
import {Component} from '@angular/core';

@Component({
  selector:    'pbj-dashbox-popover',
  templateUrl: './dashbox-popover.component.html',
  styleUrls:   ['./dashbox-popover.component.scss']
})
export class DashBoxPopoverComponent extends PBJBasePopover {

  config = CPBJ.CDASHBOX;

  // injected by navParams
  box: Pbj.DashboardBox;

  saveSettings() {
    console.log('todo: remove this or save here??', this.box);
  }
}
