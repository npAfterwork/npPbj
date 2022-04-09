import {Pbj} from '../model/model';
import {Utils} from '../model/utils';
import {PopoverService} from '../popover/popover.service';
import {NavService} from '../services/nav/nav.service';
import {PlayerService} from '../services/player/player.service';
import {SettingsService} from '../services/settings/settings.service';
import {PbjBasePage} from './pbj-base-page';
import {OnInit} from '@angular/core';

export class PbjBaseListPage extends PbjBasePage implements OnInit {
  get itemSize(): Pbj.ListItemSize {
    return this._itemSize;
  }

  set itemSize(value: Pbj.ListItemSize) {
    this.listConfig.size = value;
    this._itemSize = value;
  }

  get isPanel(): boolean {
    return this._isPanel;
  }

  set isPanel(value: boolean) {
    this.listConfig.panel = value;
    this._isPanel = value;
  }

  private _itemSize: Pbj.ListItemSize;
  private _isPanel: boolean;

  possibleTypes: Pbj.ItemType[];
  possibleLists: Pbj.ListType[];

  protected actions: Pbj.PopoverAction[] = [
    { title: 'Add to queue', icon: { name: 'add-sharp' }, close: true, onClick: (ev, item) => { this.player.add(item).catch(e => console.error(e)); } },
    { title: 'Remove from queue', icon: { name: 'remove-sharp' }, close: true, onClick: (ev, item) => { this.player.remove(item).catch(e => console.error(e)); } }
  ];

  protected listConfig: Pbj.ListSettings;

  constructor(pageName: string,
    navService: NavService,
    protected player: PlayerService,
    protected popoverService: PopoverService,
    protected readonly settings: SettingsService
  ) {
    super(pageName, navService);
  }

  ngOnInit() {
    super.ngOnInit();
    this.possibleTypes = Object.keys(this.settings.library.types)
      .map(type => (this.settings.library.types[type] ? type : null) as Pbj.ItemType)
      .filter(type => !!type);
    this.possibleLists = Object.keys(this.settings.library.lists)
      .map(type => (this.settings.library.lists[type] ? type : null) as Pbj.ListType)
      .filter(type => !!type);
  }

  updateListConfig(config: Pbj.ListSettings) {
    this.listConfig = config;
    this._itemSize = this.listConfig.size;
    this._isPanel = this.listConfig.panel;
  }

  onMore(ev: MouseEvent, item: Pbj.Base) {
    this.popoverService.presentPopoverAsync('menu', {
      //      header:  'hello',
      item,
      cancel:  false,
      actions: this.actions
    }, ev).catch(e => console.error(e));
  }

  onPlay(ev: MouseEvent, item: Pbj.Base) {
    if (this.player.isCurrent(item)) {
      this.player.togglePlay();
    } else if (this.player.isInQueue(item)) {
      this.player.playFrom(item as Pbj.Track); // its a track if its in queue for now
    } else {
      this.player.replaceAndPlay(item).catch(e => console.error(e));
    }
  }

  async toggleListMode() {
    this.isPanel = !this._isPanel;
    await this.settings.save();
  }

  async toggleListSize() {
    this.itemSize = Utils.toggleListItemSize(this._itemSize);
    await this.settings.save();
  }

  async changeListSettings(ev) {
    const { data } = await this.popoverService.presentPopoverSync('listconfig', {
      size:  this.listConfig.size,
      panel: this.listConfig.panel
    }, ev);
    if (data) {
      this.isPanel = data.panel && data.panel !== 'false';
      this.itemSize = data.size;
      await this.settings.save();
    }
  }
}
