import {HelpEntry} from '../../model/consts';
import {PBJBasePopover} from '../popover-base';
import {Component} from '@angular/core';
import {Platform} from '@ionic/angular';

@Component({
  selector:    'pbj-help-popover',
  templateUrl: './help-popover.component.html',
  styleUrls:   ['./help-popover.component.scss']
})
export class HelpPopoverComponent extends PBJBasePopover {

  helpEntry: HelpEntry;

  constructor(
    public readonly platform: Platform
  ) {
    super();
  }

  async close() {
    await this.popoverService.closeCurrent();
  }

}
