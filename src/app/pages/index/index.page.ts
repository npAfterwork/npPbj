import {CPBJTexts} from '../../model/consts';
import {Pbj} from '../../model/model';
import {Utils} from '../../model/utils';
import {PopoverService} from '../../popover/popover.service';
import {DataService} from '../../services/data/data.service';
import {NavService} from '../../services/nav/nav.service';
import {PlayerService} from '../../services/player/player.service';
import {SettingsService} from '../../services/settings/settings.service';
import {FilterService} from '../../services/ui/filter.service';
import {UiService} from '../../services/ui/ui.service';
import {PbjBaseListFilterablePage} from '../pbj-base-list-filterable-page';
import {ActivatedRoute} from '@angular/router';
import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector:    'pbj-index',
  templateUrl: './index.page.html',
  styleUrls:   ['./index.page.scss']
})
export class IndexPage extends PbjBaseListFilterablePage implements OnInit, OnDestroy {
  type: Pbj.ItemType;
  style: 'all' | 'single';
  items: Pbj.Base[] = [];
  headerFn = Utils.headerFnIndex;

  constructor(navService: NavService,
    settings: SettingsService,
    player: PlayerService,
    popover: PopoverService,
    filterService: FilterService,
    dataService: DataService,
    public readonly uiService: UiService,
    private readonly route: ActivatedRoute
  ) {
    super('', navService, player, popover, settings, filterService, dataService);
  }

  ngOnInit() {
    super.ngOnInit();
    this.subscriptions.push(
      this.route.params.subscribe(async params => {
        this.style = params.style;
        this.type = params.type;
        this.update().catch(e => console.error(e));
      })
    );
  }

  async update() {
    const items = await this.dataService.getIndex(this.type);
    const filter = this.filterService.filterItems(items, this.items);
    this.pageName = CPBJTexts.PAGES.index[this.type];
    this.updateListConfig(this.settings.library.views[this.type]);
    if (filter.didFilter) {
      this.items = filter.filtered;
    }
  }

  changedType(type: Pbj.ItemType) {
    this.navService.relocateToIndex(this.type = type, this.style);
    this.update().catch(e => console.error(e));
  }

}
