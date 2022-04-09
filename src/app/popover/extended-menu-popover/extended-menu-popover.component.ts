import {Pbj} from '../../model/model';
import {PBJBasePopover} from '../popover-base';
import {Component, OnInit} from '@angular/core';

@Component({
  selector:    'pbj-extended-menu-popover',
  templateUrl: './extended-menu-popover.component.html',
  styleUrls:   ['./extended-menu-popover.component.scss']
})
export class ExtendedMenuPopoverComponent extends PBJBasePopover implements OnInit {
  actions: Pbj.PopoverAction[] = [];  // injected by navParams
  header: string; // injected by navParams
  small = false;  // [injected] by navParams
  cancel = true;  // [injected] by navParams
  item: Pbj.Base; // [injected] by navParams

  constructor() {
    super();
  }

  ngOnInit() {
    console.log(this);
  }

  async onAction(action: Pbj.PopoverAction, ev: MouseEvent) {
    if (action.close) {
      await this.close();
    }
    action.onClick(ev, this.item);
  }

  async close() {
    await this.popoverService.closeCurrent();
  }

  //  private async jumpToArtist() {
  //    let artistID;
  //    if (this.item.item_type === 'album') {
  //      artistID = (this.item as Pbj.Album).artistID;
  //    } else if (this.item.item_type === 'track') {
  //      artistID = (this.item as Pbj.Track).albumArtistID;
  //      //      artistID = (<Pbj.Track>this.item).artistID; // TODO: Settings use album artist only
  //    }
  //    if (artistID) {
  //      await this.navService.navigateToArtist(artistID);
  //      await this.close();
  //    }
  //  }
  //  private jumpToAlbum() {
  //    let albumID;
  //    if (this.item.item_type === 'track') {
  //      albumID = (this.item as Pbj.Track).albumID;
  //    }
  //    if (albumID) {
  //      this.navService.navigateToArtist(albumID);
  //    }
  //  }

}
