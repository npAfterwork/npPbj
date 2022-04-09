import {CPBJTexts} from '../../model/consts';
import {Pbj} from '../../model/model';
import {PopoverService} from '../../popover/popover.service';
import {DataService} from '../../services/data/data.service';
import {NavService} from '../../services/nav/nav.service';
import {PlayerService} from '../../services/player/player.service';
import {SettingsService} from '../../services/settings/settings.service';
import {UiService} from '../../services/ui/ui.service';
import {PbjBaseListPage} from '../pbj-base-list-page';
import {ActivatedRoute} from '@angular/router';
import {Component, OnInit} from '@angular/core';

@Component({
  selector:    'pbj-list',
  templateUrl: './list.page.html',
  styleUrls:   ['./list.page.scss']
})
export class ListPage extends PbjBaseListPage implements OnInit {
  type: Pbj.ItemType;
  list: Pbj.ListType;
  style: 'all' | 'list' | 'type' | 'none';
  items: Pbj.Base[] = [];
  noMoreItems: boolean;

  constructor(
    navService: NavService,
    player: PlayerService,
    popoverService: PopoverService,
    settings: SettingsService,
    private readonly dataService: DataService,
    private readonly uiService: UiService,
    private readonly route: ActivatedRoute
  ) {
    super(CPBJTexts.PAGES.list, navService, player, popoverService, settings);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.route.params.subscribe(params => {
      this.style = params.style;
      this.list = params.list;
      this.type = params.type;
      this.update().catch(e => console.error(e));
    });
  }

  async update() {
    this.updateListConfig(this.settings.library.views[this.type]);
    const listRef = await this.dataService.getList(this.type, this.list);
    this.items = [].concat(...listRef);
    this.noMoreItems = (this.items.length < 30); //  default amount = 30
  }

  onTypeChange($event) {
    this.navService.relocateToList(this.type = $event, this.list, this.style);
    this.update().catch(e => console.error(e));
  }

  onListChange($event: Pbj.ListType) {
    this.navService.relocateToList(this.type, this.list = $event, this.style);
    this.update().catch(e => console.error(e));
  }

  async loadMore() {
    const amount = 25;
    const more = await this.dataService.getAdditionalListItems(this.type, this.list, this.items.length, amount);
    this.noMoreItems = (more.length < amount); // is this the end?
    this.items = this.items.concat(...more);
  }
}
