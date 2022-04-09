import {CPBJTexts} from '../../../model/consts';
import {Pbj} from '../../../model/model';
import {PopoverService} from '../../../popover/popover.service';
import {DataService} from '../../../services/data/data.service';
import {NavService} from '../../../services/nav/nav.service';
import {PlayerService} from '../../../services/player/player.service';
import {SettingsService} from '../../../services/settings/settings.service';
import {PbjBaseListPage} from '../../pbj-base-list-page';
import {ActivatedRoute} from '@angular/router';
import {Component, OnInit} from '@angular/core';

@Component({
  selector:    'pbj-album',
  templateUrl: './album.page.html',
  styleUrls:   ['./album.page.scss']
})
export class AlbumPage extends PbjBaseListPage implements OnInit {

  protected actions: Pbj.PopoverAction[] = [
    { title: 'Add to queue', icon: { name: 'add-sharp' }, close: true, onClick: (ev, item) => { this.player.add(item).catch(e => console.log(e)); } },
    { title: 'Remove from queue', icon: { name: 'remove-sharp' }, close: true, onClick: (ev, item) => { this.player.remove(item).catch(e => console.log(e)); } },
    { title: 'Show album art', icon: { name: 'images-sharp' }, close: true, onClick: (ev, item) => this.onShowImages(item) }
  ];

  private album: Pbj.Album;

  constructor(
    navService: NavService,
    settings: SettingsService,
    player: PlayerService,
    popover: PopoverService,
    private readonly route: ActivatedRoute,
    public readonly dataService: DataService
  ) {
    super(CPBJTexts.PAGES.album, navService, player, popover, settings);
    this.updateListConfig(this.settings.single.album);
  }

  ngOnInit() {
    super.ngOnInit();
    this.route.params.subscribe(async params => {
      this.album = await this.dataService.getItem(params.id, 'album', ['track']);
    });
  }

  onShowImages(item: Pbj.Base) {
    this.popoverService.presentPopoverSync('image', {
      item
    }).catch(e => console.log(e));
  }
}
