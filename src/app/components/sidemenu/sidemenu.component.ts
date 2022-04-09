import {Pbj} from '../../model/model';
import {CROUTES} from '../../model/routes';
import {NavService} from '../../services/nav/nav.service';
import {PlayerService} from '../../services/player/player.service';
import {Component} from '@angular/core';

@Component({
  selector:    'pbj-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls:   ['./sidemenu.component.scss']
})
export class SidemenuComponent {
  menuItems: Pbj.MenuItem[] = [
    { route: CROUTES.HOME, label: 'Home', icon: 'home-sharp' },
    { route: CROUTES.LIST.GET('all', 'album', 'newest'), label: 'Lists', icon: 'pricetags-sharp' },
    { route: CROUTES.INDEX.GET('all', 'album'), label: 'Library', icon: 'library-sharp' },
    // TODO: Settings: Additional Pages
    { route: CROUTES.ARTISTS, label: 'Artists', icon: 'barcode-sharp' },
    { route: CROUTES.ALBUMS, label: 'Albums', icon: 'barcode-sharp' },
    { route: CROUTES.FOLDERS, label: 'Folders', icon: 'barcode-sharp' },
    //    { route: CROUTES.SEARCH, label: 'Search', icon: 'search' },
    //    { route: CROUTES.PODCASTS, label: 'Podcasts', icon: 'radio' },
    { route: CROUTES.SETTINGS, label: 'Settings', icon: 'settings-sharp' },
    //    { route: CROUTES.PLAYLISTS, label: 'Playlists', icon: 'barcode' },
    //    { route: CROUTES.START, label: 'Start', icon: 'home' },
    { route: CROUTES.QUEUE, label: 'Queue', icon: 'list-sharp', disabled: () => !this.player.hasItems() }
  ];

  constructor(
    public navService: NavService,
    public player: PlayerService
  ) { }

}
