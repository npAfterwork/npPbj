import {CPBJ} from '../../../model/consts';
import {Pbj} from '../../../model/model';
import {PopoverService} from '../../../popover/popover.service';
import {DataService} from '../../../services/data/data.service';
import {PlayerService} from '../../../services/player/player.service';
import {UiService} from '../../../services/ui/ui.service';
import {Subscription} from 'rxjs/internal/Subscription';
import {Platform} from '@ionic/angular';
import {Component, Input, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector:    'pbj-selectionbar',
  templateUrl: './selectionbar.component.html',
  styleUrls:   ['./selectionbar.component.scss']
})
export class SelectionBarComponent implements OnInit, OnDestroy {

  private actions: Pbj.PopoverAction[] = [
    { title: 'Add to queue', icon: { name: 'add-sharp' }, close: true, onClick: () => { this.appendSelectionToQueue().catch(e => console.error(e)); } },
    { title: 'Remove from queue', icon: { name: 'remove-sharp' }, close: true, onClick: () => { this.removeSelectionFromQueue().catch(e => console.error(e)); } }
  ];

  @Input() standalone = false;
  items: string[] = [];

  selection = {
    enabled:    false,
    count:      0,
    _sub:       undefined as Subscription,
    _subresize: undefined as Subscription
  };
  private verySmall: boolean;

  constructor(
    private readonly uiService: UiService,
    private readonly dataService: DataService,
    private readonly popoverService: PopoverService,
    private readonly player: PlayerService,
    public readonly platform: Platform
  ) {
  }

  ngOnInit(): void {
    this.resize();
    this.selection._subresize = this.platform.resize.asObservable().subscribe(() => this.resize());
    // Toggle Selection Buttons on selection change
    this.selection._sub = this.uiService.selection$.subscribe(selection => this.toggleSelectionToolbar(selection));
  }

  ngOnDestroy(): void {
    this.selection._sub.unsubscribe();
    this.selection._subresize.unsubscribe();
  }

  clear() {
    this.uiService.clearSelection();
  }

  private toggleSelectionToolbar(selection: string[]) {
    if (selection.length) {
      this.items = selection;
      this.selection.enabled = true;
      this.selection.count = this.uiService.selected(true).length;
    } else {
      this.items = [];
      this.selection.enabled = false;
      this.selection.count = 0;
    }
  }

  async getTracks() {
    const trackIDs = this.uiService.selected(true);
    return this.dataService.getTracksByIDs(trackIDs);
  }

  async playSelection() {
    const tracks = await this.getTracks();
    await this.player.replaceAll(tracks);
    console.log('play already', tracks.length);
  }

  async appendSelectionToQueue() {
    const tracks = await this.getTracks();
    await this.player.appendAll(tracks);
    console.log('play already', tracks.length);
  }

  private async removeSelectionFromQueue() {
    const tracks = await this.getTracks();
    await this.player.removeAll(tracks);
    console.log('play already', tracks.length);
  }

  moreSelection(ev: MouseEvent) {
    this.popoverService.presentPopoverAsync('menu', {
      cancel:  false,
      actions: this.actions
    }, ev).catch(e => console.error(e));
  }

  private resize() {
    this.verySmall = this.platform.width() < CPBJ.TOOLBAR.SMALL;
    console.log('platform ', this.platform.width());
  }

}
