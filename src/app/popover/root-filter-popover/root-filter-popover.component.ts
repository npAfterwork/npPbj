import {Pbj} from '../../model/model';
import {FilterService} from '../../services/ui/filter.service';
import {PBJBasePopover} from '../popover-base';
import {NavParams, Platform} from '@ionic/angular';
import {Component} from '@angular/core';

@Component({
  selector:    'pbj-root-filter-popover',
  templateUrl: './root-filter-popover.component.html',
  styleUrls:   ['./root-filter-popover.component.scss']
})
export class RootFilterPopoverComponent extends PBJBasePopover {
  roots: (Pbj.Root & { enabled: boolean })[];
  current: string;

  constructor(
    private navParams: NavParams,
    public readonly platform: Platform,
    private readonly filterService: FilterService
  ) {
    super();
  }

  async dismissModal() {
    this.filterService.updateRootFilter(this.roots);
    return this.popoverService.closeCurrent(this.roots);
  }
}
