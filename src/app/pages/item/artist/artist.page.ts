import {VirtualListComponent} from '../../../components/virtual-list/virtual-list.component';
import {CPBJTexts} from '../../../model/consts';
import {Pbj} from '../../../model/model';
import {Utils} from '../../../model/utils';
import {PopoverService} from '../../../popover/popover.service';
import {DataService} from '../../../services/data/data.service';
import {NavService} from '../../../services/nav/nav.service';
import {PlayerService} from '../../../services/player/player.service';
import {SettingsService} from '../../../services/settings/settings.service';
import {UiService} from '../../../services/ui/ui.service';
import {PbjBaseListPage} from '../../pbj-base-list-page';
import {IonContent} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector:    'pbj-artist',
  templateUrl: './artist.page.html',
  styleUrls:   ['./artist.page.scss']
})
export class ArtistPage extends PbjBaseListPage implements OnInit {
  headerfn = Utils.headerFnAlbumYears;
  tab: 'albums' | 'similar' = 'albums';
  artist: Pbj.Artist;
  @ViewChild('content') content: IonContent;
  @ViewChild('similar') similar: VirtualListComponent;

  constructor(
    navService: NavService,
    settings: SettingsService,
    player: PlayerService,
    popover: PopoverService,
    private readonly route: ActivatedRoute,
    public readonly dataService: DataService,
    public readonly uiService: UiService,
    private readonly elementRef: ElementRef
  ) {
    super(CPBJTexts.PAGES.artist, navService, player, popover, settings);
    this.updateListConfig(this.settings.single.artist.albums);
  }

  ngOnInit() {
    super.ngOnInit();
    console.log('init artist page');
    this.loadData();
  }

  private loadData() {
    this.route.params.subscribe(async params => {
      this.artist = await this.dataService.getItem(params.id, 'artist', ['album', 'track', 'similar']);
    });
  }

  segmentChanged($event: CustomEvent<{ value: 'albums' | 'similar' }>) {
    this.tab = $event.detail.value;
    console.log($event);
  }

  scrollToTop() {
    const lists = (this.elementRef.nativeElement as HTMLElement).querySelectorAll('pbj-virtual-list');
    console.log(lists);
    let scrollTo = 0;
    lists.forEach(list => {
      if (scrollTo !== 0) { return; }
      const bodyRect = document.body.getBoundingClientRect();
      const elemRect = list.getBoundingClientRect();
      const listTop = elemRect.top - bodyRect.top;
      console.log(listTop);
      scrollTo = (listTop === 2 * 56) ? scrollTo : listTop;
    });
    scrollTo = scrollTo === 0 ? 0 : scrollTo - 2 * 56; // Toolbelt...
    this.content.scrollToPoint(0, this.scrollTop + scrollTo, 300).catch(e => console.error(e));
  }
}
