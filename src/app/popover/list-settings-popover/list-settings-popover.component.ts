import {Pbj} from '../../model/model';
import {PBJBasePopover} from '../popover-base';
import {Component, OnInit} from '@angular/core';

@Component({
  selector:    'pbj-list-settings-popover',
  templateUrl: './list-settings-popover.component.html',
  styleUrls:   ['./list-settings-popover.component.scss']
})
export class ListSettingsPopoverComponent extends PBJBasePopover implements OnInit {
  size: Pbj.ListItemSize;
  panel: boolean;

  ngOnInit() {}

}
