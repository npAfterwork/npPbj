import {CROUTES} from '../../model/routes';
import {PopoverService} from '../../popover/popover.service';
import {NavService} from '../../services/nav/nav.service';
import {PlayerService} from '../../services/player/player.service';
import {SettingsService} from '../../services/settings/settings.service';
import {UiService} from '../../services/ui/ui.service';
import {Subscription} from 'rxjs/internal/Subscription';
import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector:    'pbj-player',
  templateUrl: './player.component.html',
  styleUrls:   ['./player.component.scss']
})
export class PlayerComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];

  constructor(
    public readonly uiService: UiService,
    public readonly player: PlayerService,
    private readonly popover: PopoverService,
    private readonly settings: SettingsService,
    private readonly navService: NavService
  ) { }

  ngOnInit() {
    this.subscriptions.push(
      // this.player.onPlaying$.subscribe((() => )),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  async toggleQueue() {
    if (this.navService.url === CROUTES.ROOT + CROUTES.QUEUE) {
      this.navService.navigateBack();
    } else {
      await this.navService.navigateToQueue();
    }
  }

  positionChanged(ev: CustomEvent) {
    ev.preventDefault();
    ev.stopPropagation();
    this.player.seek(ev.detail.value);
  }

}
