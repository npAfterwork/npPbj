import {Pbj} from '../../model/model';
import {PopoverService} from '../../popover/popover.service';
import {NavService} from '../../services/nav/nav.service';
import {PlayerService} from '../../services/player/player.service';
import {SettingsService} from '../../services/settings/settings.service';
import {PbjBaseListPage} from '../pbj-base-list-page';
import {Platform} from '@ionic/angular';
import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector:    'pbj-queue-popover',
  templateUrl: './queue.page.html',
  styleUrls:   ['./queue.page.scss']
})
export class QueuePage extends PbjBaseListPage implements OnInit, OnDestroy {
  scrollTop = 0;

  protected actions: Pbj.PopoverAction[] = [
    { title: 'Remove', icon: { name: 'trash-sharp' }, close: true, onClick: (ev, item) => { this.player.remove(item).catch(e => console.error(e)); } }
  ];

  constructor(
    navService: NavService,
    player: PlayerService,
    settings: SettingsService,
    popoverService: PopoverService,
    public readonly platform: Platform
  ) {
    super('Queue', navService, player, popoverService, settings);
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
  }

  //  async onSizeChange() {
  //    this.settings.queue.list.size = Utils.toggleListItemSize(this.settings.queue.list.size);
  //    await this.settings.save();
  //  }
  //
  //  async onPanelChange() {
  //    this.settings.queue.list.panel = !this.settings.queue.list.panel;
  //    await this.settings.save();
  //  }
  //
  //  async reorderItems(ev: CustomEvent) {
  //    const itemMove = this._items.splice(ev.detail.from, 1)[0];
  //    this._items.splice(ev.detail.to, 0, itemMove);
  //    ev.detail.complete();
  //  }
}
