import {PopoverService} from '../popover/popover.service';
import {DataService} from '../services/data/data.service';
import {NavService} from '../services/nav/nav.service';
import {PlayerService} from '../services/player/player.service';
import {SettingsService} from '../services/settings/settings.service';
import {FilterService} from '../services/ui/filter.service';
import {PbjBaseListPage} from './pbj-base-list-page';
import {OnInit} from '@angular/core';

export abstract class PbjBaseListFilterablePage extends PbjBaseListPage implements OnInit {

  protected constructor(pageName: string,
    navService: NavService,
    player: PlayerService,
    popoverService: PopoverService,
    settings: SettingsService,
    protected readonly filterService: FilterService,
    public readonly dataService: DataService
  ) {
    super(pageName, navService, player, popoverService, settings);
  }

  ngOnInit() {
    super.ngOnInit();
    this.subscriptions.push(
      this.filterService.filter$.subscribe(() => this.update())
    );
  }

  abstract update(): void;
}
